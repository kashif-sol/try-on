<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\Session;
use Illuminate\Support\Facades\Log;
use Shopify\Clients\Graphql;

class ProductController extends Controller
{
    
    public function getProducts(Request $request)
    {
        $shop = $this->getShopData($request);
        $shopName = $shop['name'];
        $accessToken = $shop['access_token'];
        $clientGQL = new Graphql($shopName, $accessToken);
        $search = $request->query('search');
        $cursor = $request->query('endCursor');
        $previousCursor = $request->query('startCursor');
        $total_products = 10;
        $query = '
        {
        products(';
        if ($search) {
            $query .= 'query: "' . $search . '"';
        }

        if ($cursor) {
            $query .= 'first: ' . $total_products . ', after: "' . $cursor . '"';
        } elseif ($previousCursor) {
            $query .= 'last: ' . $total_products . ', before: "' . $previousCursor . '"';
        } else {
            $query .= 'first: ' . $total_products . '';
        }

        $query .= ') {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            edges {
              cursor
              node {
                id
                title
                status
                priceRangeV2{
                    minVariantPrice{
                        amount
                        currencyCode
                    }
                }
                featuredImage{
                  url
                }
              }
            }
          }
         }';

        $query = str_replace(["\n", "\r", "\t"], '', $query);
    //    dd($query);
        $result = $clientGQL->query(['query' => $query]);
        // dd($result->getDecodedBody());
        if ($result->getStatusCode() == 200) {
            $products = $result->getDecodedBody();
            if (isset($products['errors'])) {
                return [
                    'status' => 'error',
                    'message' => $products['errors'][0]['message']
                ];
            }
            $pagination = $products['data']['products']['pageInfo'];
            $productsData = [];
            
            foreach ($products['data']['products']['edges'] as $product) {
                $image = null;
                if (isset($product['node']['featuredImage'])) {
                    $image = $product['node']['featuredImage']['url'];
                }
                preg_match('/(\d+)$/', $product['node']['id'], $matches);
                $lastInteger = $matches[0];
                $product_db = Product::where("product_id" , $lastInteger)->first();
                $product_status = "Draft";
                $views = 0;
                if(!empty( $product_db) && isset( $product_db)){
                    $product_status  = $product_db->status;
                    $views = $product_db->views;
                }
                $productsData[] = [
                    'id' => $lastInteger ,
                    'title' => $product['node']['title'],
                    'price' => $product['node']['priceRangeV2']['minVariantPrice']['amount'],
                    'status' => $product['node']['status'],
                    'image' => $image,
                    'views' => $views,
                    'status' => $product_status
                ];
            }


            $startCursor = $products['data']['products']['pageInfo']['startCursor'];
            $endCursor = $products['data']['products']['pageInfo']['endCursor'];
            $lastEdge = end($products['data']['products']['edges']);
            $cursor = $lastEdge['cursor'];
         //   dd($pagination,$cursor);
            return [
                'status' => 'success',
                'products' => $productsData,
                'pagination' => $pagination,
                'search' => $search,
                'startCursor' => $startCursor,
                'endCursor' => $endCursor,
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'Something went wrong'
            ];
        }
    }

    public function saveProducts(Request $request)
    {
        $shop = $this->getShopData($request);
        if(isset($request->products))
        {
            $products = $request->products;
            foreach ($products as $key => $product) {
                $productId = $product['product_id'];
                $image = $product['image'];
                $price = $product['price'];
                $title = $product['title'];
                $status = "Published";
                $api_status = 0;
                $product = Product::where("product_id" , $productId)->first();
                if(empty( $product) || !isset( $product)){
                    $product = new Product();
                }
                $product->product_id = $productId;
                $product->image = $image;
                $product->status = $status;
                $product->price = $price;
                $product->title = $title;
                $product->api_status = $api_status;
                $product->shop_id = $shop['id'];
                $product->save();
            }
            
            return [
                'status' => 'success',
                'message' => 'Products Published Successfully!'
            ];
        }else{
            return [
                'status' => 'error',
                'message' => 'Please choose products'
            ];
        }
    }
 
    public function remove_product($productId){

        $product = Product::where("product_id" , $productId)->first();

        if(!empty( $product) || isset( $product)){
            $product->status = "Draft";
            $product->save();
        }

        return [
            'status' => 'success',
            'message' => 'Products found',
            'd' => $product
        ];
    }

    public function top_analytics(Request $request)
    {
        $shop = $this->getShopData($request);
        $topProducts = Product::where("shop_id" , $shop['id'])->orderBy('views', 'desc')->take(10)->get();
        return [
            'status' => 'success',
            'message' => '',
            'top_products' => $topProducts,
        ];
        
    }

    public function check_product_button($productId)
    {
        $product = Product::where("product_id" , $productId)->where("status" , "Published")->first();
        if(empty( $product) || !isset( $product)){
            return [
                'status' => 'error',
                'message' => 'Product not found!'
            ];
        }

        return [
            'status' => 'success',
            'message' => 'Products found'
        ];

    }

    public function save_try($productId)
    {
        $product = Product::where("product_id" , $productId)->first();
        $views = $product->views;
        $product->views = $views + 1;
        $product->save();
        return [
            'status' => 'success',
            'message' => 'Products found'
        ];

    }


    public function getShopData($request)
    {

        $session = $request->get('shopifySession');
        $shop = Session::where('shop', $session->getShop())->first(['shop','access_token','id']);
        return ['name' => $shop->shop,'access_token' => $shop->access_token,'id' => $shop->id];
    }


}
