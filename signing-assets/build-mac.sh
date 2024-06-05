# https://www.electron.build/code-signing.html
# https://www.youtube.com/watch?v=WnipZaYslRc

source ".env"
export CSC_LINK=$CERTIFICATE_PATH
export CSC_KEY_PASSWORD=$CERTIFICATE_PASSWORD
export CSC_NAME=$CERTIFICATE_NAME
export CSC_KEYCHAIN=$CERTIFICATE_KEYCHAIN
