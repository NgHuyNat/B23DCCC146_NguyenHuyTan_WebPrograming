let listItem = document.querySelectorAll(".item");
// thêm kí tự vào trong thẻ li
listItem.forEach((item, index) => {
	item.innerHTML = "Toi la so " + (index + 1);
});
