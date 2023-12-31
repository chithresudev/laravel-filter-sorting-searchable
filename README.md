# laravel Devchithu-Filter-Sorting-Searchable

[![Latest Stable Version](http://poser.pugx.org/devchithu/laravel-filter-sorting-searchable/v)](https://packagist.org/packages/devchithu/laravel-filter-sorting-searchable) [![Total Downloads](http://poser.pugx.org/devchithu/laravel-filter-sorting-searchable/downloads)](https://packagist.org/packages/devchithu/laravel-filter-sorting-searchable) [![Latest Unstable Version](http://poser.pugx.org/devchithu/laravel-filter-sorting-searchable/v/unstable)](https://packagist.org/packages/devchithu/laravel-filter-sorting-searchable) [![License](http://poser.pugx.org/devchithu/laravel-filter-sorting-searchable/license)](https://packagist.org/packages/devchithu/laravel-filter-sorting-searchable) [![PHP Version Require](http://poser.pugx.org/devchithu/laravel-filter-sorting-searchable/require/php)](https://packagist.org/packages/devchithu/laravel-filter-sorting-searchable)


This Package for handling dynamic column sorting, filter and searchable in Laravel.


![Screenshot](public/filter_sort_searchable.gif)


## Installation & Usages

### Basic Setup

Install via composer; in console: 
```
composer require devchithu/laravel-filter-sorting-searchable 
``` 
or require in *composer.json*:
```json
{
    "require": {
        "devchithu/laravel-filter-sorting-searchable": "^1.0"
    }
}
```
then run `composer update` in your terminal to pull it in.

Once this has finished, you will need to add the service provider to the providers array in your app.php config as follows:

path : project/config/app.php

Find 'providers=>[]' add inside below code (Custom Service Providers...)

```php
Devchithu\LaravelFilterSortingSearchable\Providers\FilterSortingSearchableProvider::class,
```
Example like code :  project/config/app.php

```php
'providers' => [

    App\Providers\RouteServiceProvider::class,

    /*
     * Third Party Service Providers...
     */
    Devchithu\LaravelFilterSortingSearchable\Providers\FilterSortingSearchableProvider::class,
],
```
### Usages

Use **FilterSortSearchable** trait inside your *Eloquent* model(s).

```php
use Devchithu\LaravelFilterSortingSearchable\Traits\FilterSortingSearchable;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, FilterSortingSearchable;
    ...
    ...
}
```

### Font Awesome 6.4^ (default font classes)

Install [Font-Awesome](https://fontawesome.com/icons/) Search "sort" in [cheatsheet](https://fontawesome.com/icons/) and see used icons yourself.

```blade
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
```
Completed.

### Bootstrap 5 version

CSS File
```code
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
```
JS File

```code
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>

```

## Publish Js file

then run publish cmd you must to publish only js file and where-ever your want 'filter, sort, searchable' using the below script in blade.php file

```
php artisan vendor:publish --tag=filter-sorting-searchable
```
See public/filter-sorting-searchable.js (if you want any change update this code inside)

# Two method of design filter sorting extension
#### 1. Bootstrap Inline filter sorting Blade Extension
#### 2. Bootstrap filter using Modal, Offcanvas Blade Extension

Two Type of blade extension using script file.

##  1. Bootstrap Inline filter sorting Blade Extension
Must push that js file in blade, where-ever your want like (better than push that js file into main index blade.php):

```
    <script src="{{ asset('filter-sorting-searchable.js') }}"></script>
```
OR,

```
@push('scripts')
    <script src="{{ asset('filter-sorting-searchable.js') }}"></script>
@endpush
```

## * Sorting

There is a blade extension for you to use **@filterSort()**

```blade
@filterSort(['sorting' => true,'field_name' => 'name'])
```

**Custom field name sorting**
```blade
@filterSort(['sorting' => true,'field_name' => 'name', 'label_name' => 'Name'])
```

**Here**,
1. `sorting` parameter default is false. `true` is sorting enabled, if don't need sorting just put `false` or just remove sorting parames.
2. `field_name` parameter is column in database table field, **name**.
3. `label_name` parameter is displayed inside anchor tags and print valueable field name. incase of  `label_name` doe'st use automatically get column in database table field.

**what are field sorting declare the using your *Eloquent* model(s) inside function like below code**,

Use **FilterSortSearchable** trait inside your *Eloquent* model(s).

### *Eloquent* model 

```php
use Devchithu\LaravelFilterSortingSearchable\Traits\FilterSortingSearchable;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, FilterSortingSearchable;
    ...
    ...

    /**
     * The table sorting order asc and desc.
     *
     * @var string
     */

    public $sorting = [
        'id',
        'name',
        'email',
        'created_at',
    ];


}
```

### Controller's `index()` method

```php
public function index(Request $request)
{
    $users = User::sorting()->get();

    return view('user.index', ['users' => $users]);
}
```

## * Inline Filter

***Blade table config***

There is a sorting similar same blade extension for you to use **@filterSort()**

```blade
 @filterSort(['filter' => true, 'field_name' => 'instance_type'])
```

**Custom field name filter**

```blade
@filterSort(['filter' => true,'field_name' => 'name', 'label_name' => 'Name'])
```

**what are field filterable declare the using your *Eloquent* model(s) inside function like below code**,

```php
use Devchithu\LaravelFilterSortingSearchable\Traits\FilterSortingSearchable;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, FilterSortingSearchable;
    ...
    ...

    /**
     * The table filter order asc and desc.
     *
     * @var string
     */

     public $filterable = [
        'id',
        'name',
        'email'
    ];

}
```

### Controller's `index()` method

```php
public function index(Request $request)
{
    $users = User::filterable()->get();

    return view('user.index', ['users' => $users]);
}
```

## Sorting & Filter

Incase, If you want sort and filter sametime  using below Code, 

```blade
 @filterSort(['sotring' => true, 'filter' => true, 'field_name' => 'status_type', 'label_name' => 'Status Type '])
```

**Here**,
1. `filter` parameter default is false. `true` is filter enabled, if don't need filter just put `false` or just remove filter parames.
2. `field_name` parameter is column in database table field, **name**.
3. `label_name` parameter is displayed inside anchor tags and print valueable field name. incase of  `label_name` doe'st use automatically get column in database table field.

**UI - filter input field automatically generate**

1. filter is `true` default create input box type = 'text', if you want different input type like (selelect, radio, range) below code put the array params
   `'type' => 'text' // 'type' => 'select' or  radio, range`

Here, if you `select ` option using  multiple option value data like `'multiple_option' => ['All', 'active', 'in_active']

```blade
 @filterSortSearchable(['sorting' => true, 'filter' => true, 'type' => 'select', 'field_name' => 'status', 'label_name' => 'Status', 'multiple_option' => ['All', 'active', 'in_active']])
                               
```

**what are field sorting and filter declare the using your *Eloquent* model(s) inside function like below code**,

```php
use Devchithu\LaravelFilterSortingSearchable\Traits\FilterSortingSearchable;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, FilterSortingSearchable;
    ...
    ...

    /**
     * The table sorting order asc and desc.
     *
     * @var string
     */

    public $sorting = [
        'id',
        'name',
        'email',
        'created_at',
    ];

    /**
     * The table filter.
     *
     * @var string
     */

     public $filterable = [
        'id',
        'name',
        'email'
    ];

}
```

### Controller's `index()` method

```php
public function index(Request $request)
{
    $users = User::sorting()->filterable()->get();

    return view('user.index', ['users' => $users]);
}
```

### Controller's `index()` method with paginate()

```php
public function index(Request $request)
{
    $users = User::sorting()->filterable()->paginate(20);

    return view('user.index', ['users' => $users]);
}
```

## *Searchable
This searchable global area find the table data

**what are field searchable declare the using your *Eloquent* model(s) inside function like below code**,

```php
use Devchithu\LaravelFilterSortingSearchable\Traits\FilterSortingSearchable;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, FilterSortingSearchable;
    ...
    ...

    /**
     * The table searchable.
     *
     * @var string
     */

     public $searchable = [
        'id',
        'name',
        'email'
    ];

}
```

There is a blade extension for you to use **@searchable()**

```blade
@searchable()
```
### Controller's `index()` method

```php
public function index(Request $request)
{
    $users = User::searchable()->get();

    return view('user.index', ['users' => $users]);
}
```

###  Controller's `index()` method
If you want filter, sorting, searchable declare the scope function

```php
public function index(Request $request)
{
    $users = User::sorting()->filterable()->searchable()->get();

    return view('user.index', ['users' => $users]);
}

```


# *customized filter 
If you want filter some field customazed used here file

```
php artisan vendor:publish --tag=customFilterTrait
```
See app\CustomFilter\CustomFilterTrait.php (if you want any change update this code inside)

**what are the customized filter field don't declare  (filterable) array. declare custom filterable the using your *Eloquent* model(s) inside function**,

```php
use Devchithu\LaravelFilterSortingSearchable\Traits\FilterSortingSearchable;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword, FilterSortingSearchable;
    ...
    ...


    /**
     * The table filter.
     *
     * @var string
     */

     public $customfilterable = [
            'name',
            'status',
    ];

}
```


## * Binding Params
What are field sorting, searching and filterting below code
Which place to you want binding parameters declare the **@bindingParams()**

```blade
@bindingParams()
```
Run finally,
```
php artisan op:cl
```

OR,

##  2. Bootstrap filter using Modal, Offcanvas Blade Extension

## Publish Js file

then run publish cmd you must to publish only js file your want 'filter, sort, searchable' using the below script in blade.php file

```
php artisan vendor:publish --tag=filter-sorting-searchable-modal-offcanvas
```
See public/filter-sorting-searchable-modal-offcanvas.js (if you want any change update this code inside)

Must push that js file in blade, where-ever your want like (better than push that js file into main index blade.php):

```
    <script src="{{ asset('filter-sorting-searchable-modal-offcanvas.js') }}"></script>
```
OR,

```
@push('scripts')
    <script src="{{ asset('filter-sorting-searchable-modal-offcanvas.js') }}"></script>
@endpush
```


## Sorting & Filter

Incase, If you want sort and filter sametime  using below Code, 

```blade
 @filterSort(['sotring' => true, 'filter' => true, 'field_name' => 'status_type', 'label_name' => 'Status Type '])
```

## Modal Offcanvas Filter
Filter `Button` show below code in blade: 
Whereever you want filter button put the code **@filterBtn()**

***Default Offcanvas***

Here, Bootstrap5^ default offcanvas inside.

```blade
 @filterBtn()
```

***Change Custom name***

when, if you need button label name change parse the parameter like

```blade
  @filterBtn(['label' => 'custom-name'])
```

***Bootstrap5^ Offcanvas and Modal***

Default offcanvas don't need any params, if need to change modal window like code :

***Bootstrap5 Modal***

```blade
 @filterBtn(['viewport' => 'modal', 'label_name' => 'custom-name'])
```
**Here**

1. **viewport** is default `offcanvas` if change modal given in array inside
2. if **viewport_direction** is `offcanvas` placement direction (like: `offcanvas-start, offcanvas-end, offcanvas-top, offcanvas-bottom`)
3. if **viewport_direction** is `modal` placement modal-dialog-position (like: `modal-dialog-centered, modal-size-(xl)*`)


Run finally,
```
php artisan op:cl
```

***Don't declare at the sametime two type of js file, at time only one using js file***

(filter-sorting-searchable.js Or filter-sorting-searchable-modal-offcanvas.js)

Thank you .



