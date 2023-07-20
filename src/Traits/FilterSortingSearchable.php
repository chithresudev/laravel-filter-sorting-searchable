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

        $params = app('request')->except(['page', '_token']);
        if(is_array($this->filterable)) {
            foreach($params as $column_key => $param) {
                if(in_array($column_key, $this->filterable)) {
                    $query->where($column_key, 'LIKE', '%' . $param . '%');
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

        $params = app('request')->except(['page', '_token']);
        if(is_array($this->searchable)) {
            foreach($params as $column_key => $param) {
                if(in_array($column_key, $this->searchable)) {
                    $query->where($column_key, 'LIKE', '%' . $param . '%');
             }
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
        
        return $query->when(app('request')->sort_direction, function($order) {
            return $order->orderBy(app('request')->sort_field, app('request')->sort_direction);
        });

        return $query;
    }


}
