// delete localstorage token
async function logout() {
  localStorage.removeItem("dogetoken");
  window.location.reload();
}
