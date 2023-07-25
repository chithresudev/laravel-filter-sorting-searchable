<?php
namespace Devchithu\LaravelFilterSortingSearchable;

Class Filter 
{

    /**
     * Static public function fieldBinding for scripts
     * 
     * @return
     */

    public static function applyData(...$input_array) {

        $collection = json_encode($input_array[0], true);
        $collection = json_decode($collection, true);

            $span = '<span ';
        
            if(isset($collection['field_name'])) {
                $span .= ' data-filter-keys=' . $collection['field_name'] ?? '';
            }

            if(isset($collection['sorting'])) {
                $span .= ' data-sorting=' . $collection['sorting'] ?? '';
            
            }
            if(isset($collection['filter'])) {
                $span .= ' data-filter=' . $collection['filter'] ?? '';

                if(isset($collection['type'])) {

                    if($collection['type'] == 'select' || $collection['type'] == 'checkbox' || $collection['type'] == 'radio') {

                        if(isset($collection['multiple_option'])) {
                            $multiple_data = str_replace(' ', '' , implode(', ', $collection['multiple_option'] ?? []));
                            $span .= ' data-filter-custom-data=' . $multiple_data;
                        } else {
                            $span .= ' data-filter-custom-data=All';
                        }
                    }
                    $span .= ' data-filter-input-type=' . $collection['type'] ?? '';
                }
            
            
            }
            
            $span .= '>'. ucwords($collection['label_name'] ?? str_replace('_', ' ', ($collection['field_name'] ?? ''))) .'</span>';

            echo $span;

    }

    /**
     * Static public function filterButton template
     * 
     * @return
     */

    public static function applyBtn(...$input_btn_array) {

            $btn_collection = json_encode($input_btn_array[0] ?? [], true);
            $btn_collection = json_decode($btn_collection, true);
            
            if(($btn_collection['viewport'] ?? 'offcanvas') == 'modal') {

                echo '
                <span>
                <button type="button" class="btn btn-sm btn-primary me-3" data-bs-toggle="modal" data-bs-target="#devFilterViewport">'  .  ($btn_collection['label_name'] ?? "Filter") . '</button>
        
                <div class="modal fade" id="devFilterViewport" tabindex="-1" aria-labelledby="'  .  ($btn_collection['label_name'] ?? "Filter") . '" aria-hidden="true">
                <div class="modal-dialog ' . ($btn_collection['viewport_direction'] ?? '') . '">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="'  .  ($btn_collection['label_name'] ?? "Filter") . '">'  .  ($btn_collection['label_name'] ?? "Filter") . '</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="dynamicFilter">
                    </div>
                    </div>
                </div>
                </div>
                </span>
                ';

            } else {
                echo '
                <span>
                <button class="btn btn-sm btn-primary me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#devFilterViewport"  aria-controls="offcanvasTop">' . ($btn_collection['label_name'] ?? 'Filter'). '</button>
        
                <div class="offcanvas offcanvas-' . ($btn_collection['viewport_direction'] ?? "start") . '" tabindex="-1" id="devFilterViewport" data-direction="' . ($btn_collection['viewport_direction'] ?? "start") . '"  aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header bg-body-secondary ">
                    <h6 class="offcanvas-title" id="offcanvasTopLabel">' . ($btn_collection['label_name'] ?? 'Filter'). '</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body" id="dynamicFilter">
                </div>
                </div>
                </span>
                
                ';
            }

    }

    /**
     * Static public function searchable template
     * 
     * @return
     */

    public static function search() 
    {
                echo '
                <span>
                <form class="row g-3">
                <div class="col-auto">
                <input type="search" name="search" '. (app('request')->search ? 'value=' . app('request')->search : '') . ' class="form-control" id="searchable" placeholder="Search here...">
                </div>
                <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">Search</button>
                </div>
            </form>
            </span>
                ';

    }

    /**
     * Static public function bingdingparams template
     * 
     * @return
     */
    public static function bindingParams()
    {
                echo '
                <span id="binding_params"></span>
                ';

    }
    
}
