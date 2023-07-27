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
            __DIR__.'/../../public/filter-sorting-searchable.js' => public_path('filter-sorting-searchable.js'),
        ], 'filter-sorting-searchable');
        
        $this->publishes([
            __DIR__.'/../../public/filter-sorting-searchable-modal-offcanvas.js' => public_path('filter-sorting-searchable-modal-offcanvas.js'),
        ], 'filter-sorting-searchable-modal-offcanvas');
        

        $this->publishes([
            __DIR__.'/../../src/CustomFilter/CustomFilterTrait.php' => app_path('CustomFilter/CustomFilterTrait.php'),
        ], 'customFilterTrait');
        

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
