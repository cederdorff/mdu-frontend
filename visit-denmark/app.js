let _data;

async function getData() {
    const response = await fetch("en/data.json");
    const data = await response.json();
    return data;
}

async function getDataByCategory(id) {
    const results = _data.filter(item => item.Category.Id === id);
    // console.log(results);
    // return or do something with the data (results)
    return results;
}

async function getDataByMainCategory(id) {
    const results = _data.filter(item => item.MainCategory.Id === id);
    console.log(JSON.stringify(results));
    // return or do something with the data (results)
    return results;
}

async function init() {
    _data = await getData();
    await getDataByCategory(63);
    await getDataByMainCategory(62);
}

init();
