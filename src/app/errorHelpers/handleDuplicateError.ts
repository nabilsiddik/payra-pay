export const handleDuplicateError = (error: any) => {
    const duplicate = error.message.match(/"([^"]*)"/)
    return {
        errorStatusCode: 400,
        errorMessage: `${duplicate} already exist.`
    }
}