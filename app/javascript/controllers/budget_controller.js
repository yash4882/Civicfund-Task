// import { Controller } from "@hotwired/stimulus"

// export default class extends Controller {
//   static targets = ["input", "total", "remaining"]

//   connect() {
//     this.updateBudget()
//     this.inputTargets.forEach(input => {
//       input.addEventListener("input", () => this.updateBudget())
//     })
//   }

//   updateBudget() {
//     let total = 0
//     this.inputTargets.forEach(input => {
//       total += parseInt(input.value || 0)
//     })
//     this.totalTarget.innerText = total
//     this.remainingTarget.innerText = 1000 - total
//   }
// }

// app/javascript/controllers/budget_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "total", "remaining"]

  connect() {
    this.update()
  }

  update() {
    let total = 0

    this.inputTargets.forEach((el) => {
      const value = parseInt(el.value, 10)
      if (!isNaN(value)) total += value
    })

    const remaining = 1000 - total
    this.totalTarget.textContent = total
    this.remainingTarget.textContent = remaining

    // Remove all possible color classes
    this.remainingTarget.classList.remove("text-red-600", "text-blue-600")

    // Add color based on remaining amount
    if (remaining < 0) {
      this.remainingTarget.classList.add("text-red-600")
    } else if (remaining > 0) {
      this.remainingTarget.classList.add("text-blue-600")
    }
  }

  validateBeforeSubmit(event) {
    let total = 0

    this.inputTargets.forEach((el) => {
      const value = parseInt(el.value, 10)
      if (!isNaN(value)) total += value
    })

    if (total > 1000) {
      event.preventDefault()
      alert("Total allocation should not exceed $1000.")
    }
  }
}
