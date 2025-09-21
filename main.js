const firstRow = "Slow and steady wins the race";
const secondRow = "You can say that again";

//1//
function countLetter(row, letter) {
  let count = 0;
  for (let i = 0; i < row.length; i++) {
    if (row.charAt(i).toLowerCase() === letter.toLowerCase()) {
      count++;
    }
  }
  return count;
}


function getRow(firstRow, secondRow, letter) {
  const count1 = countLetter(firstRow, letter);
  const count2 = countLetter(secondRow, letter);

  if (count1 > count2) {
    return firstRow;
  } else if (count2 > count1) {
    return secondRow;
  } else {
    return "У обох рядках однакова кількість літери '" + letter + "'";
  }
}


document.getElementById("run").addEventListener("click", () => {
  const letter = prompt("Введіть літеру для підрахунку:");
  if (!letter) {
    alert("Ви нічого не ввели!");
    return;
  }
  const result = getRow(firstRow, secondRow, letter);
  alert("Рядок з більшою кількістю літери '" + letter + "':\n\n" + result);
  console.log(result);
});
//2//
function formattedPhone(phone) {
          let cleaned = phone.replace(/\D/g, ""); 

          if (cleaned.length === 12 && cleaned.startsWith("380")) {

            return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
          } 
          else if (cleaned.length === 11 && cleaned.startsWith("80")) {

            return `+38 (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 11)}${cleaned.slice(11)}`;
          }
          else if (cleaned.length === 10 && cleaned.startsWith("0")) {

            return `+38 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`;
          } 
          else {
            return "Неправильний формат номера";
          }
        }

        document.getElementById("formatPhone").addEventListener("click", () => {
          const phone = prompt("Введіть номер телефону (+380..., 809..., або 067...):");
          if (!phone) {
            alert("Ви нічого не ввели!");
            return;
          }
          const result = formattedPhone(phone);
          alert("Результат форматування:\n\n" + result);
          console.log(result);
        });
