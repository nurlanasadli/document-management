<?php

namespace Database\Seeders;

use App\Models\District;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define region names and their corresponding numbers
        $regions = [
            ['name' => 'Abşeron', 'code' => 1],
            ['name' => 'Ağdam', 'code' => 2],
            ['name' => 'Ağdaş', 'code' => 3],
            ['name' => 'Ağcabədi', 'code' => 4],
            ['name' => 'Ağstafa', 'code' => 5],
            ['name' => 'Ağsu', 'code' => 6],
            ['name' => 'Astara', 'code' => 7],
            ['name' => 'Balakən', 'code' => 8],
            ['name' => 'Bərdə', 'code' => 9],
            ['name' => 'Bakı', 'code' => 10],
            ['name' => 'Beyləqan', 'code' => 11],
            ['name' => 'Biləsuvar', 'code' => 12],
            ['name' => 'Cəbrayıl', 'code' => 14],
            ['name' => 'Cəlilabad', 'code' => 15],
            ['name' => 'Daşkəsən', 'code' => 16],
            ['name' => 'Dəvəçi', 'code' => 17],
            ['name' => 'Şirvan', 'code' => 18],
            ['name' => 'Füzuli', 'code' => 19],
            ['name' => 'Gəncə', 'code' => 20],
            ['name' => 'Gədəbəy', 'code' => 21],
            ['name' => 'Goranboy', 'code' => 22],
            ['name' => 'Hacıqabul', 'code' => 23],
            ['name' => 'Göyçay', 'code' => 24],
            ['name' => 'Xanlar', 'code' => 25],
            ['name' => 'Xankəndi', 'code' => 26],
            ['name' => 'Xaçmaz', 'code' => 27],
            ['name' => 'Xocavənd', 'code' => 28],
            ['name' => 'Xızı', 'code' => 29],
            ['name' => 'İmişli', 'code' => 30],
            ['name' => 'Kəlbəcər', 'code' => 32],
            ['name' => 'Kürdəmir', 'code' => 33],
            ['name' => 'Qax', 'code' => 34],
            ['name' => 'Qazax', 'code' => 35],
            ['name' => 'Qəbələ', 'code' => 36],
            ['name' => 'Qobustan', 'code' => 37],
            ['name' => 'Qusar', 'code' => 38],
            ['name' => 'Qubadlı', 'code' => 39],
            ['name' => 'Quba', 'code' => 40],
            ['name' => 'Laçın', 'code' => 41],
            ['name' => 'Lənkəran', 'code' => 42],
            ['name' => 'Lerik', 'code' => 43],
            ['name' => 'Masallı', 'code' => 44],
            ['name' => 'Mingəçevir', 'code' => 45],
            ['name' => 'Naftalan', 'code' => 46],
            ['name' => 'Neftçala', 'code' => 47],
            ['name' => 'Oğuz', 'code' => 48],
            ['name' => 'Saatlı', 'code' => 49],
            ['name' => 'Sumqayıt', 'code' => 50],
            ['name' => 'Samux', 'code' => 51],
            ['name' => 'Salyan', 'code' => 52],
            ['name' => 'Siyəzən', 'code' => 53],
            ['name' => 'Sabirabad', 'code' => 54],
            ['name' => 'Şəki', 'code' => 55],
            ['name' => 'Şamaxı', 'code' => 56],
            ['name' => 'Şəmkir', 'code' => 57],
            ['name' => 'Şuşa', 'code' => 58],
            ['name' => 'Tərtər', 'code' => 59],
            ['name' => 'Tovuz', 'code' => 60],
            ['name' => 'Ucar', 'code' => 61],
            ['name' => 'Zaqatala', 'code' => 62],
            ['name' => 'Zərdab', 'code' => 63],
            ['name' => 'Zəngilan', 'code' => 64],
            ['name' => 'Yardımlı', 'code' => 65],
            ['name' => 'Yevlax', 'code' => 66],
            ['name' => 'Babək', 'code' => 67],
            ['name' => 'Şərur', 'code' => 68],
            ['name' => 'Ordubad', 'code' => 69],
            ['name' => 'Naxçıvan', 'code' => 70],
            ['name' => 'Şahbuz', 'code' => 71],
            ['name' => 'Culfa', 'code' => 72]
        ];

        // Insert regions into the database
        District::insert($regions);
    }
}
