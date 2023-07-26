// * get all elements based on data filter keys

const getDataElements = document.querySelectorAll("[data-filter-keys]");

const fragmentElement = document.createDocumentFragment();

let searchParams = new URLSearchParams(window.location.search);

let bindingParam = document.getElementById("binding_params");

let isFilterCount = 0;
getDataElements.forEach((getDataElement) => {
  const isFilter = getDataElement.dataset.filter;
  const isSorting = getDataElement.dataset.sorting;
  const filterKeys = getDataElement.dataset.filterKeys;
  const filterLabel = getDataElement.innerText;

  // Filter section select, radio, checkbox, input search fields
  // *** FILTER
  //***********************************START**********************************************************/

  if (isFilter) {
    // Binding what are the params filter
    if (searchParams.get(filterKeys)) {
      isFilterCount++;
      const existParamBind = `<span class="badge border text-secondary border-secondary w-auto rounded-5  py-1  me-2 mb-2" data-param-field=${filterKeys}>
            ${filterLabel} : ${searchParams.get(
        filterKeys
      )} <button type="button" class="btn-close ms-2 p-1" onClick="filterRemove(this)" ></button>
        </span>`;

      bindingParam.insertAdjacentHTML("beforeend", existParamBind);
    }

    // create dynamic element for requesting
    const createSpan = document.createElement("span");
    createSpan.className = "ms-2";
    createSpan.innerHTML =
      '<i class="fa-solid fa-sliders" type="button" data-bs-toggle="dropdown"></i>';
    getDataElement.after(createSpan);

    const filterType = getDataElement.dataset.filterInputType;

    let getCustomsData = getDataElement.dataset.filterCustomData;

    const customFieldDropDown = document.createElement("div");
    customFieldDropDown.className = "dropdown-menu p-2";
    customFieldDropDown.setAttribute("id", filterKeys);

    // * Filter Type select
    if (filterType == "select") {
      const customField = document.createElement("select");
      customField.setAttribute("name", filterKeys);
      customField.setAttribute("onChange", "clickOption(this)");
      getCustomsData.split(",").forEach((getCustomData) => {
        const trimCustomData = getCustomData.trim();
        const replaceData = trimCustomData.replaceAll("_", " ");
        const isSelected =
          trimCustomData == searchParams.get(filterKeys) ? true : false;
        const option = new Option(
          replaceData,
          trimCustomData,
          isSelected,
          isSelected
        );

        customField.appendChild(option);
      });
      customField.className = "form-select";
      customFieldDropDown.appendChild(customField);
      createSpan.append(customFieldDropDown);

      // * Filter Type checkbox and radio button *** //
    } else if (filterType == "checkbox" || filterType == "radio") {
      const formCreate = document.createElement("form");
      getCustomsData.split(",").forEach((getCustomData) => {
        const trimCustomData = getCustomData.trim();
        const replaceData = trimCustomData.replaceAll("_", " ");
        const formCheckBox = document.createElement("div");
        formCheckBox.className = "form-check ms-2";
        formCheckBox.innerHTML = `<input class="form-check-input" name="${filterKeys}" type="${filterType}" value="${trimCustomData}" id="${trimCustomData}" ${
          searchParams.get(filterKeys) &&
          searchParams.get(filterKeys).split(",").includes(getCustomData)
            ? "checked"
            : ""
        }>
                    <label class="form-check-label font-12" for="${trimCustomData}">
                      ${replaceData}
                    </label>`;
        formCreate.appendChild(formCheckBox);
      });

      const createSubmitBtn = document.createElement("button");
      createSubmitBtn.setAttribute("type", "submit");
      createSubmitBtn.className = "btn btn-sm btn-info m-2";
      createSubmitBtn.textContent = "Add Filter";
      formCreate.appendChild(createSubmitBtn);
      customFieldDropDown.append(formCreate);
      createSpan.append(customFieldDropDown);

      // * Checkbox or Radio submit function start
      formCreate.addEventListener("submit", (e) => {
        e.preventDefault();
        const field_name = e.target[0].name;
        var formData = new FormData(formCreate);
        const multipleOptions = formData.getAll(field_name).toString();
        searchParams.append(field_name, multipleOptions);

        const queryString = new URLSearchParams(
          Object.fromEntries(new URLSearchParams(searchParams))
        );

        window.location.search = queryString;
      });

      //* Checkbox or Radio submit function end
      //* Input Search on submit function start
    } else {
      const formCreate = document.createElement("form");
      var inputField = `
                            <div class="d-flex">
                                <input type="${
                                  filterType ? filterType : "text"
                                }" placeholder="Search..." name="${filterKeys}" class="form-control rounded-0 shadow-none"
                                    autocomplete="off" value="${
                                      searchParams.get(filterKeys) == null
                                        ? ""
                                        : searchParams.get(filterKeys)
                                    }">
                                <button type="submit" class="btn btn-sm btn-success rounded-0"><i
                                        class="fa fa-search"></i></button>
                            </div>`;
      formCreate.innerHTML = inputField;
      customFieldDropDown.append(formCreate);
      createSpan.append(customFieldDropDown);

      formCreate.addEventListener("submit", (e) => {
        e.preventDefault();
        const field_name = e.target[0].name;
        var formData = new FormData(formCreate);
        const multipleOptions = formData.getAll(field_name).toString();
        searchParams.append(field_name, multipleOptions);

        const queryString = new URLSearchParams(
          Object.fromEntries(new URLSearchParams(searchParams))
        );

        window.location.search = queryString;
      });
    }
    /* Input Search on submit function end */
  }

  //*********************************** ENDS **********************************************************/
  //-------------------------------------------------------------------------------------------------
  // Sorting section fields
  // *** SORTING ORDER
  //-------------------------------------------------------------------------------------------------
  //*********************************** START **********************************************************/

  if (isSorting) {
    if (searchParams.get("sort_field") == filterKeys) {
      const existParamBind = `<span class="badge text-primary border border-primary w-auto rounded-5 py-1 me-2 mb-2" data-param-field=${filterKeys}>  
            ${filterLabel} :  Sort By  ${searchParams
        .get("sort_direction")
        .toUpperCase()}
             <button type="button" class="btn-close ms-2 p-1" onClick="filterRemove(this)" ></button>
        </span>`;
      bindingParam.insertAdjacentHTML("afterbegin", existParamBind);
    }

    switch (true) {
      case filterKeys == "name" && searchParams.get("sort_field") == "name":
        const letterUpDown =
          searchParams.get("sort_direction") == "desc" ? "down-z-a" : "up-a-z";

        var icon = `<i class="fa-solid fa-arrow-${letterUpDown}"></i>`;
        break;

      case filterKeys == "id" && searchParams.get("sort_field") == "id":
      case filterKeys == "created_at" &&
        searchParams.get("sort_field") == "created_at":
        const numberUpDown =
          searchParams.get("sort_direction") == "desc" ? "down-9-1" : "up-1-9";

        var icon = `<i class="fa-solid fa-arrow-${numberUpDown}"></i>`;

        break;

      case filterKeys == "amount" && searchParams.get("sort_field") == "amount":
        const amountUpDown =
          searchParams.get("sort_direction") == "desc"
            ? "down-short-wide"
            : "up-wide-short";

        var icon = `<i class="fa-solid fa-arrow-${amountUpDown}"></i>`;

        break;

      default:
        if (filterKeys != searchParams.get("sort_field")) {
          var icon = ` <i class="fa-solid fa-arrows-up-down"></i>`;
        } else {
          const upDown =
            searchParams.get("sort_direction") == "desc" ? "down" : "up";
          var icon = ` <i class="fa-solid fa-arrow-${upDown}"></i>`;
        }

        break;
    }

    getDataElement.insertAdjacentHTML("beforeend", icon);

    getDataElement.setAttribute("onClick", "sortingOrder(this)");
    getDataElement.style.textDecoration = "none";
    getDataElement.style.cursor = "pointer";
    getDataElement.style.color = "currentColor";
  }
});
fragmentElement.append(getDataElements);

//Select Onchange function
function sortingOrder(sortEl) {
  const filterKeys = sortEl.dataset.filterKeys;
  const direction =
    searchParams.get("sort_direction") == "asc" ? "desc" : "asc";

  searchParams.append("sort_field", filterKeys);
  searchParams.append("sort_direction", direction);
  const queryString = new URLSearchParams(
    Object.fromEntries(new URLSearchParams(searchParams))
  );
  window.location.search = queryString;
}

//Select Onchange function
function clickOption(optionEl) {
  var { name, value } = optionEl;
  searchParams.append(name, value);
  const queryString = new URLSearchParams(
    Object.fromEntries(new URLSearchParams(searchParams))
  );

  [...queryString.entries()].forEach(([formKeys, formValue]) => {
    if (formValue == 0 || formValue == "All") {
      queryString.delete(formKeys);
    }
  });

  window.location.search = queryString;
}

//Removed binding params click
function filterRemove(removeElementParam) {
  let queryString;
  if (typeof removeElementParam != "undefined") {
    const removeParam = removeElementParam.parentNode.dataset.paramField;
    queryString = new URLSearchParams(
      Object.fromEntries(new URLSearchParams(searchParams))
    );
    [...queryString.entries()].forEach(() => {
      if (searchParams.get("sort_field")) {
        queryString.delete("sort_direction");
        queryString.delete("sort_field");
      } else {
        queryString.delete(removeParam);
      }
    });
  } else {
    queryString = "";
  }
  window.location.search = queryString;
}

if (isFilterCount) {
  const clearAll = `<button type="button" class="btn-sm btn btn-secondary rounded-5 px-3 py-1 me-2 mb-1" onClick="filterRemove()">Clear All</button>`;

  bindingParam.insertAdjacentHTML("beforeend", clearAll);
}

if (searchParams.get("search")) {
  const existParamBind = `<span class="badge border text-primary border-primary rounded-5 py-1 me-2 mb-2" data-param-field='search'> Search value :  ${searchParams.get(
    "search"
  )}
     <button type="button" class="btn-close ms-2 p-1" onClick="filterRemove(this)" ></button>
</span>`;
  bindingParam.insertAdjacentHTML("afterbegin", existParamBind);
}

const filterBtn = document.getElementById("devFilterViewport");

if (typeof filterBtn != "undefined") {
  filterBtn?.previousElementSibling.remove();
  filterBtn?.remove();
}

function searchAndHighlight() {
  const tableRows = document.querySelectorAll("td");
  for (const row of tableRows) {
    for (const column of tableRows) {
      const cellText = column.innerText;
      if (cellText.includes(searchParams.get("search"))) {
        var highlightedContent = cellText.replace(
          new RegExp(searchParams.get("search"), "gi"),
          '<span class="highlight">$&</span>'
        );
        column.innerHTML = highlightedContent;
      }
    }
  }
}

if (searchParams.get("search")) {
  searchAndHighlight();
}
