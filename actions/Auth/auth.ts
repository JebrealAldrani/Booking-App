import login from "./login"
import signUp from './signUp'

const auth = (mode: string, prevState: {}, formData: FormData) => {
  if(mode === 'login') {
    return login(prevState, formData)
  }

  return signUp(prevState, formData)
}

export default auth

