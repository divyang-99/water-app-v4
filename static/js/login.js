const loginButton = document.getElementById("loginButton");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Event listener for page reloads
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.location.reload();
    }
});

// Event listener for login button
loginButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ username, password }),
    });

    const data = await response.json(); // Parse the JSON response

    if (data.success) {
      // Check the success field from the server response
      window.location.href = "/dashboard"; // Redirect on success
    } else {
      errorMessage.textContent = "Error logging in!";
      console.log("Response from server:", response);
    }
  } catch (error) {
    errorMessage.textContent = "Server error! Try again later.";
    console.error(error); // Log the error to the console for debugging
  }
});
