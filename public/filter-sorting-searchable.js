// * get all elements based on data filter keys
const getBindingElements = document.getElementById('dynamicFilter');

const getDataElements = document.querySelectorAll('[data-filter-keys]');

const fragmentElement = document.createDocumentFragment();

const devFilterViewport = document.getElementById('devFilterViewport');


const createForm = document.createElement('form');
createForm.classList.add('text-start');

if (devFilterViewport) {
    if (devFilterViewport.dataset.direction == 'top' || devFilterViewport.dataset.direction == 'bottom') {

        createForm.className = 'd-flex justify-content-around align-items-center text-start';
    }
}


let searchParams = new URLSearchParams(window.location.search);

getDataElements.forEach((getDataElement) => {
    const isFilter = getDataElement.dataset.filter;


    const isSorting = getDataElement.dataset.sorting;

    const filterKeys = getDataElement.dataset.filterKeys;
    const filterLabel = getDataElement.innerText;

    if (isFilter) {

        const filterType = getDataElement.dataset.filterInputType;

        let getCustomsData = getDataElement.dataset.filterCustomData;

        // * create dynamic element for requesting
        const formDiv = document.createElement('div');
        formDiv.className = 'mb-3 me-3 col';

        const label = document.createElement('label');
        label.setAttribute('for', filterKeys);
        label.classList.add('form-label');
        label.innerText = filterLabel;
        formDiv.append(label);

        if (filterType == 'select') {

            const customField = document.createElement('select');
            customField.setAttribute('name', filterKeys);


            getCustomsData.split(',').forEach((getCustomData) => {
                const trimCustomData = getCustomData.trim();
                const replaceData = trimCustomData.replaceAll('_', ' ');
                const isSelected = (trimCustomData == searchParams.get(filterKeys) ? true : false);
                const option = new Option(replaceData, trimCustomData, isSelected, isSelected);

                customField.appendChild(option);
            });

            customField.className = 'form-select';
            formDiv.appendChild(customField);

        } else {
            const customField = document.createElement('input');
            customField.type = 'text';
            customField.setAttribute('name', filterKeys);
            customField.classList.add('form-control');
            customField.id = filterKeys;
            customField.value = searchParams.get(filterKeys);
            formDiv.appendChild(customField);
        }
        createForm.append(formDiv);
    }

    if (isSorting) {
        switch (filterKeys) {
            case searchParams.get('sort_field') == 'name':
                var icon = ` <i class="fa fa-sort-alpha`;
                break;

            case searchParams.get('sort_field') == 'id':
            case searchParams.get('sort_field') == 'created_at':
                var icon = ` <i class="fa fa-sort-numeric`;
                break;

            case searchParams.get('sort_field') == 'amount':
                var icon = ` <i class="fa fa-sort-amount`;
                break;

            default:
                var icon = ` <i class="fa fa-sort`;
                break;
        }


        getDataElement.insertAdjacentHTML('beforeend', ` ${icon}${(filterKeys == searchParams.get('sort_field')) ?  ('-' + searchParams.get('sort_direction')) : '' }"></i>`);
        // $(`<i class="fa fa-sort"></i>`) append(getDataElement);
        const direction = searchParams.get('sort_direction') == 'asc' ? 'desc' : 'asc';
        const getQuerySortString = window.location.href.split('?')[0];
        const querySortString = getQuerySortString + `?sort_field=${filterKeys}&sort_direction=${direction}`;
        getDataElement.setAttribute('href', querySortString);
        getDataElement.style.textDecoration = 'none';
        getDataElement.style.color = 'currentColor';
    }

});

const btnDiv = document.createElement('div');
btnDiv.className = 'mt-2';
const btnElement = document.createElement('button');
btnElement.type = 'submit';
btnElement.innerText = 'Submit';
btnElement.className = 'btn btn-primary';
btnDiv.append(btnElement);
createForm.append(btnDiv);
fragmentElement.append(createForm);
getBindingElements.append(fragmentElement);

createForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(createForm);
    [...formData.entries()].forEach(([formKeys, formValue]) => {
        if (formValue == 0 || formValue == 'All') {
            formData.delete(formKeys);
        }
    });

    const queryString = new URLSearchParams(formData).toString();
    window.location.search = queryString;
});
