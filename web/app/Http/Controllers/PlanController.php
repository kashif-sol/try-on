<?php

namespace App\Http\Controllers;

use App\Lib\EnsureBilling;
use App\Models\Charges;
use App\Models\Plan;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PlanController extends Controller
{
    protected $helper;
    public function __construct()
    {
       /// $this->helper = new HelperController();
    }

    public function getShopData($request)
    {
        $session = $request->get('shopifySession');
        $shop = Session::where('shop', $session->getShop())->first(['shop','access_token','id' , 'is_plan']);
        return ['name' => $shop->shop,'access_token' => $shop->access_token,'id' => $shop->id , 'is_plan' => $shop->is_plan];
    }
    public function getPlans(Request $request)
    {
        $session = $this->getShopData($request);
        $plans = Plan::get();
        if (filled($plans)) {
            return [
                'status' => 'success',
                'plans' => $plans,
                'is_plan' => $session['is_plan']
            ];
        } else {
            return [
                'status' => 'error',
                'plans' => 'Plans data not found'
            ];
        }
    }
    public function subscribePlan(Request $request)
    {

        $session = $request->get('shopifySession');
        $shop_name = $session->getShop();
        $shop = Session::where('shop', $shop_name)->first();
        $planId = $request->plan_id;
        $plan = Plan::where('id', $planId)->first();
        if ($plan->name == 'Freemium') {
            $cancle = $this->canclePlan($shop, $plan->id);
            if ($cancle) {
                $shop->update(['is_plan' => false]);
                return [
                    'status' => 'success',
                    'message' => 'Plan downgrade successfully',
                    'url' => ""
                ];
            } else {
                return [
                    'status' => 'error',
                    'message' => 'Something went wrong!',
                    'url' => ''
                ];
            }
        } else {
            $billing = [
                "required" => true,
                "chargeName" => $plan->name,
                "amount" => $plan->price,
                "currencyCode" => "USD",
                "plan_id" => $plan->id,
                "interval" => EnsureBilling::INTERVAL_EVERY_30_DAYS,
            ];
            $redirectUrl = EnsureBilling::requestPayment($session, $billing);
            return [
                'status' => 'success',
                'message' => 'Plan downgrade successfully',
                'url' => $redirectUrl
            ];
        }
    }
    public function canclePlan($shop, $plan_id)
    {
        $accessToken = $shop->access_token;
        $shopifyDomain = $shop->shop;
        $charge = Charges::orderBy('id', 'DESC')->where('shop', $shopifyDomain)->first();
        if ($charge) {
            $subscriptionId = $charge->charge_id;
            $response = Http::withHeaders([
                'X-Shopify-Access-Token' => $accessToken,
            ])->delete("https://$shopifyDomain/admin/api/2023-07/recurring_application_charges/$subscriptionId.json");
            if ($response->successful()) {
                return true;
            } else {
                return false;
            }
        }
    }
}
