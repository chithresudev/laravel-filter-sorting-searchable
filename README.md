# laravel Devchithu-Filter-Sorting-Searchable

[![Latest Stable Version](http://poser.pugx.org/devchithu/laravel-filter-sorting-searchable/v)](https://packagist.org/packages/devchithu/laravel-filter-sorting-searchable) [![Total Downloads](http://poser.pugx.org/devchithu/laravel-filter-sorting-searchable/downloads)](https://packagist.org/packages/devchithu/laravel-filter-sorting-searchable) [![Latest Unstable Version](http://poser.pugx.org/devchithu/laravel-filter-sorting-searchable/v/unstable)](https://packagist.org/packages/devchithu/laravel-filter-sorting-searchable) [![License](http://poser.pugx.org/devchithu/laravel-filter-sorting-searchable/license)](https://packagist.org/packages/devchithu/laravel-filter-sorting-searchable) [![PHP Version Require](http://poser.pugx.org/devchithu/laravel-filter-sorting-searchable/require/php)](https://packagist.org/packages/devchithu/laravel-filter-sorting-searchable)


This Package for handling dynamic column sorting, filter and searchable in Laravel.

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

## Publish Js file

then run publish cmd You must to publish only js file and where-ever your want 'filter, sort, searchable' using the below script in blade.php file

```
php artisan vendor:publish --provider="Devchithu\LaravelFilterSortingSearchable\Providers\FilterSortingSearchableProvider"
```
See public/js/filter-sorting-searchable.js (if you want any change update this code inside)

# Bootstrap Inline filter sorting and Modal, Offcanvas extension

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

### Sorting

There is a blade extension for you to use **@filterSort()**

```blade
@filterSort(['sorting' => true,'field_name' => 'name'])
```
**Here**,
1. `sorting` parameter default is false. `true` is sorting enabled, if don't need sorting just put `false` or just remove sorting parames.
2. `field_name` parameter is column in database table field, **name**.
3. `label_name` parameter is displayed inside anchor tags and print valueable field name. incase of  `label_name` doe'st use automatically get column in database table field.
   
### Filter
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

***Blade table config***

There is a sorting same blade extension for you to use **@filterSort()**

```blade
 @filterSort(['filter' => true, 'field_name' => 'instance_type'])
```

**Custom field name sorting and filter**

```blade
@filterSort(['sorting' => true,'field_name' => 'name', 'label_name' => 'Name'])
```

### Sorting & Filter

Code, 

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
 @filterSortSearchable(['sorting' => true, 'filter' => true, 'type' => 'select', 'field_name' => 'status', 'label_name' => 'Status', 'custom-multiple-data' => ['All', 'active', 'in_active']])
                               
```

### Controller's `index()` method

```php
public function index(Request $request)
{
    $users = User::filterable()->get();

    return view('user.index', ['users' => $users]);
}
```

### Controller's `index()` method with paginate()

```php
public function index(Request $request)
{
    $users = User::filterable()->paginate(20);

    return view('user.index', ['users' => $users]);
}
```

## Font Awesome (default font classes)

Install [Font-Awesome](https://fontawesome.com/v4.7.0/) Search "sort" in [cheatsheet](https://fontawesome.com/v4.7.0/icons/) and see used icons (12) yourself.

Completed.

