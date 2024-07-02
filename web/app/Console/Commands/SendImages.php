<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class SendImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $productsWithSessions = DB::table('products')
            ->join('sessions', 'products.shop_id', '=', 'sessions.id')
            ->select('products.*', 'sessions.*') 
            ->where('products.api_status', 0) 
            ->get();
        
        foreach ($productsWithSessions as $record) {
            $image = $record->image;
            $price = $record->price;
            $shop_name = $record->shop;
            $product_name = $record->title;
            $shop_link = $record->shop;
            $type = "dresses";
            $productId = $record->product_id;
            $parts = explode('.', $shop_name);
            $shop_name = $parts[0];
            $this->sendToApi($image , $price , $shop_link , $shop_name , $product_name , $type , $productId);
        }
        return 1;
    }

    public function sendToApi($image , $price , $shop_link , $shop_name , $product_name , $type , $productId){

        $fileUrl = $image; 
        $fileName = basename($fileUrl); 
        $tempFilePath = storage_path('app/temp/' . $fileName);

        // Create the temp directory if it doesn't exist
        if (!Storage::exists('temp')) {
            Storage::makeDirectory('temp');
        }

        // Download the file
        $response = Http::get($fileUrl);
        if ($response->successful()) {
            Storage::put('temp/' . $fileName, $response->body());
        } else {
            Log::error('Failed to download file from URL: ' . $fileUrl);
            return response()->json(['error' => 'Failed to download file'], 500);
        }

        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://mirrarme-api-b04a9bb28853.herokuapp.com/upload',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => array(
            'name' => $product_name,
            'brand' => $shop_name,
            'price' => $price,
            'type' => 'dresses',
            'link' => $shop_link,
            'image_file' => new \CURLFile($tempFilePath) 
        ),
        CURLOPT_HTTPHEADER => array(
            'api-key: CE14UlCYz4MKNTBkNjg2kA'
        ),
        ));

        $response = curl_exec($curl);
        $error = curl_error($curl);
        curl_close($curl);
        
        Log::info('cURL Response: ' . $response);
        if ($error) {
            Log::error('cURL Error: ' . $error);
        }

        // Clean up the temporary file
        Storage::delete('temp/' . $fileName);
        $product = Product::where("product_id" , $productId)->first();
        $product->api_status = 1;
        $product->save();

    }
}
