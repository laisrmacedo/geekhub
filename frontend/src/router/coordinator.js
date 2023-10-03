export const goToLogin = (navigate) => {
  navigate('/')
}

export const goToSignup = (navigate) => {
  navigate('/signup')
}

export const goToDashboard = (navigate, user) => {
  navigate(`/${user}`)
}

export const goToDashboardComments = (navigate, user, postId) => {
  navigate(`/${user}/${postId}`)
}


