<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plans')->insert([
            [
                'name' => 'Entry-Level Plan',
                'plan_info' => 'Try-Ons Included: 5,000',
                'price' => 69.00,
                'tries' => 5000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Medium Plan',
                'plan_info' => 'Try-Ons Included: 25,000',
                'price' => 299.00,
                'tries' => 25000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Large Plan',
                'plan_info' => 'Try-Ons Included: 125,000',
                'price' => 1199.00,
                'tries' => 125000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
