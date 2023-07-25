<?php

namespace Devchithu\LaravelFilterSortingSearchable\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class FilterSortingSearchableProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([
            __DIR__.'/../../public' => public_path('/'),
        ], 'public');
        

        Blade::directive('filterSort', function ($input_array) {

            return "<?php Devchithu\LaravelFilterSortingSearchable\Filter::applyData({$input_array}) ?>";

        });

        Blade::directive('filterBtn', function ($input_btn_array) {

        return "<?php Devchithu\LaravelFilterSortingSearchable\Filter::applyBtn({$input_btn_array}) ?>";

        });

        Blade::directive('searchable', function ($input_search_array) {

            return "<?php Devchithu\LaravelFilterSortingSearchable\Filter::search({$input_search_array}) ?>";
    
            });

        Blade::directive('bindingParams', function ($input_params) {

            return "<?php Devchithu\LaravelFilterSortingSearchable\Filter::bindingParams({$input_params}) ?>";
    
            });
            
        }
}
