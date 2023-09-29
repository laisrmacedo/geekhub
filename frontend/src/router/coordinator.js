export const goToLogin = (navigate) => {
  navigate('/')
}

export const goToSignup = (navigate) => {
  navigate('/signup')
}

export const goToDashboard = (navigate, user) => {
  navigate(`/${user}`)
}


