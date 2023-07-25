// * get all elements based on data filter keys
const getBindingElements = document.getElementById("dynamicFilter");

const getDataElements = document.querySelectorAll("[data-filter-keys]");

const fragmentElement = document.createDocumentFragment();

const devFilterViewport = document.getElementById("devFilterViewport");

const createForm = document.createElement("form");

let bindingParam = document.getElementById("binding_params");

let isFilterCount = 0;

if (
  devFilterViewport?.dataset.direction == "top" ||
  devFilterViewport?.dataset.direction == "bottom"
) {
  createForm.className = "d-flex justify-content-around align-items-center";
}
let searchParams = new URLSearchParams(window.location.search);

getDataElements.forEach((getDataElement) => {
  const isFilter = getDataElement.dataset.filter;

  const isSorting = getDataElement.dataset.sorting;

  const filterKeys = getDataElement.dataset.filterKeys;
  const filterLabel = getDataElement.innerText;

  if (isFilter) {
    // Binding what are the params filter
    if (searchParams.get(filterKeys)) {
      isFilterCount++;
      const existParamBind = `<span class="badge low w-auto rounded-5  py-1 me-2 mb-2" data-param-field=${filterKeys}>
                    ${filterLabel} : ${searchParams.get(
        filterKeys
      )} <button type="button" class="btn-close ms-2" onClick="filterRemove(this)" ></button>
                </span>`;

      bindingParam.insertAdjacentHTML("beforeend", existParamBind);
    }

    const filterType = getDataElement.dataset.filterInputType;

    let getCustomsData = getDataElement.dataset.filterCustomData;

    // * create dynamic element for requesting
    const formDiv = document.createElement("div");
    formDiv.className = "mb-3 me-3 col";

    const label = document.createElement("label");
    label.setAttribute("for", filterKeys);
    label.classList.add("form-label");
    label.innerText = filterLabel;
    formDiv.append(label);

    if (filterType == "select") {
      const customField = document.createElement("select");
      customField.setAttribute("name", filterKeys);

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
      formDiv.appendChild(customField);
    } else if (filterType == "checkbox" || filterType == "radio") {
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
        formDiv.appendChild(formCheckBox);
      });
    }

    //* Checkbox or Radio submit function end
    //* Input Search on submit function start
    else {
      const customField = document.createElement("input");
      customField.type = "text";
      customField.setAttribute("name", filterKeys);
      customField.classList.add("form-control");
      customField.id = filterKeys;
      customField.value = searchParams.get(filterKeys);
      formDiv.appendChild(customField);
    }
    createForm.append(formDiv);
  }

  if (isSorting) {
    if (searchParams.get("sort_field") == filterKeys) {
      const existParamBind = `<span class="badge high w-auto rounded-5 py-1 me-2 mb-2" data-param-field=${filterKeys}>  
            ${filterLabel} :  Sort By  ${searchParams
        .get("sort_direction")
        .toUpperCase()}
             <button type="button" class="btn-close ms-2" onClick="filterRemove(this)" ></button>
        </span>`;
      bindingParam.insertAdjacentHTML("beforeend", existParamBind);
    }

    switch (true) {
      case filterKeys == "name" && searchParams.get("sort_field") == "name":
        var icon = ` <i class="fa fa-sort-alpha`;
        break;

      case filterKeys == "id" && searchParams.get("sort_field") == "id":
      case filterKeys == "created_at" &&
        searchParams.get("sort_field") == "created_at":
        var icon = ` <i class="fa fa-sort-numeric`;
        break;

      case filterKeys == "amount" && searchParams.get("sort_field") == "amount":
        var icon = ` <i class="fa fa-sort-amount`;
        break;

      default:
        var icon = ` <i class="fa fa-sort`;
        break;
    }

    getDataElement.insertAdjacentHTML(
      "beforeend",
      ` ${icon}${
        filterKeys == searchParams.get("sort_field")
          ? "-" + searchParams.get("sort_direction")
          : ""
      }"></i>`
    );

    getDataElement.setAttribute("onClick", "sortingOrder(this)");
    getDataElement.style.textDecoration = "none";
    getDataElement.style.cursor = "pointer";
    getDataElement.style.color = "currentColor";
  }
});

const btnDiv = document.createElement("div");
btnDiv.className = "mt-2";
const btnElement = document.createElement("button");
btnElement.type = "submit";
btnElement.innerText = "Submit";
btnElement.className = "btn btn-primary";
btnDiv.append(btnElement);
createForm.append(btnDiv);
fragmentElement.append(createForm);
getBindingElements.append(fragmentElement);

createForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var formData = new FormData(createForm);
  [...formData.entries()].forEach(([formKeys, formValue]) => {
    if (formValue == 0 || formValue == "All") {
      formData.delete(formKeys);
    }
  });

  const queryString = new URLSearchParams(formData).toString();
  window.location.search = queryString;
});

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
  const clearAll = `<button type="button" class="btn-sm btn btn-danger rounded-5 px-3 py-1 me-2 mb-1" onClick="filterRemove()">Clear All</button>`;

  bindingParam.insertAdjacentHTML("beforeend", clearAll);
}

if (searchParams.get("search")) {
  const existParamBind = `<span class="badge medium w-auto rounded-5 py-1 me-2 mb-2" data-param-field='search'> Search value :  ${searchParams.get(
    "search"
  )}
     <button type="button" class="btn-close ms-2" onClick="filterRemove(this)" ></button>
</span>`;
  bindingParam.insertAdjacentHTML("afterbegin", existParamBind);
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
