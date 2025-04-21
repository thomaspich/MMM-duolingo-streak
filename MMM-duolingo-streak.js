Module.register("MMM-Duolingo-Streak", {
  defaults: {
    username: "", // <-- À personnaliser
    updateInterval: 5 // toutes les 5 minutes
  },

  start() {
    this.streak = null
    this.duolingoLogo = "🔥"
    this.today = new Date()
    this.endDate = null
    this.getStreak()
    setInterval(() => this.getStreak(), this.config.updateInterval * 60 * 1000)
  },

  getStreak() {
    const url = `https://www.duolingo.com/2017-06-30/users?username=${this.config.username}`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.users && data.users[0]) {
          this.streak = data.users[0].streakData.currentStreak.length
          this.endDate = new Date(data.users[0].streakData.currentStreak.endDate)
          this.updateDom()
        } else {
          console.error("Utilisateur Duolingo non trouvé ou structure inattendue")
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération Duolingo :", error)
      })
  },

  getDom() {
    const wrapper = document.createElement("div")
    wrapper.style.fontSize = "24px"

    if (this.streak === null) {
      wrapper.innerHTML = "Chargement du streak Duolingo..."
    } else {
      wrapper.innerHTML = this.today >= this.endDate ? `<b>🔥 Streak Duolingo :</b> ${this.streak} jour${this.streak > 1 ? "s" : ""}` : `<b>🥶 Streak Duolingo :</b> ${this.streak} jour${this.streak > 1 ? "s" : ""}`
    }

    return wrapper
  }
})