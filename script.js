document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taxForm")
  const modal = document.getElementById("modal")
  const closeButton = document.querySelector(".close")

  form.addEventListener("submit", function (event) {
    event.preventDefault()
    if (validateInputs()) {
      calculateTax()
    }
  })

  closeButton.addEventListener("click", function () {
    modal.style.display = "none"
  })

  function validateInputs() {
    const income = document.getElementById("income").value.trim()
    const extraIncome = document.getElementById("extraIncome").value.trim()
    const deductions = document.getElementById("deductions").value.trim()

    if (!income || isNaN(income)) {
      showErrorIcon("income")
      return false
    }
    if (!extraIncome || isNaN(extraIncome)) {
      showErrorIcon("extraIncome")
      return false
    }
    if (!deductions || isNaN(deductions)) {
      showErrorIcon("deductions")
      return false
    }

    return true
  }

  function showErrorIcon(elementId) {
    const errorIcon = document.getElementById(elementId + "ErrorIcon")
    errorIcon.style.display = "inline-block"
  }

  function calculateTax() {
    const age = document.getElementById("age").value
    const income = parseFloat(document.getElementById("income").value)
    const extraIncome = parseFloat(document.getElementById("extraIncome").value)
    const deductions = parseFloat(document.getElementById("deductions").value)

    // Perform tax calculation based on the provided formula
    let tax = 0
    if (income + extraIncome - deductions > 800000) {
      if (age === "<40") {
        tax = 0.3 * (income + extraIncome - deductions - 800000)
      } else if (age === "≥40 & <60") {
        tax = 0.4 * (income + extraIncome - deductions - 800000)
      } else if (age === "≥60") {
        tax = 0.1 * (income + extraIncome - deductions - 800000)
      }
    }

    // Calculate overall amount after tax deduction
    const overallAmount = income + extraIncome - deductions - tax

    // Display the result in the modal
    const taxResult = document.getElementById("taxResult")
    taxResult.innerHTML = `
        Tax calculated: ${tax.toFixed(2)} <br>
        Overall amount after tax deduction: ${overallAmount.toFixed(2)} 
      `

    modal.style.display = "block"
  }
})
