async function getData() {
  try {
    const processedData = await fetch();
    const result2 = await saveData(processedData);
    console.log("Data saved successfully.");
  } catch (e) {
    console.log("Error: ", e);
  }
}

getData();