<?php
namespace Devchithu\LaravelFilterSortingSearchable\Traits;
use Illuminate\Database\Eloquent\Builder;


/**
 *
 */

trait FilterSortingSearchable
{


   /**
     * Scope filterable
     * 
     * @return
     */
    public function scopeFilterable(Builder $query) {

        $params = app('request')->except(['page', '_token', 'search']);
        if(is_array($this->filterable)) {
            foreach($params as $column_key => $column_value) {
               
                try {
                    $namespace = app()->getNamespace() . "CustomFilter\\CustomFilterTrait";
                    $query = $namespace::customFilter($query, $column_key, $column_value);
                } catch (\Throwable $th) {
                    $query = $query;
                }
                
                if(in_array($column_key, $this->filterable)) {
                    $array_multipleValue = explode(',', $column_value);
                    if(count($array_multipleValue) != 1) {
                        $query->OrWhereBetween($column_key, $array_multipleValue);
                    } else {
                        $query->OrWhere($column_key, 'LIKE', '%' . $column_value . '%');
                    }
             }
        }
    }
        return $query;
    }


    /**
     * Scope searchable
     * 
     * @return
     */
    public function scopeSearchable(Builder $query) {

        if(is_array($this->searchable) && app('request')->has('search')) {
            $search = app('request')->search;
            foreach($this->searchable as $field) {
                    $query->orWhere($field, 'LIKE' , '%' .  $search . '%');
        }
    }

        return $query;
    }


    /**
     * Scope sorting desc, asc
     * 
     * @return
     */
    public function scopeSorting(Builder $query) {
        
        if(is_array($this->sorting)) {
            if(in_array(app('request')->sort_field, $this->sorting)) {
                
                $query->when(app('request')->sort_direction, function($order) {
                    return $order->orderBy(app('request')->sort_field, app('request')->sort_direction);
                });
            }
        }
   }


}
