const initialState = {
    value: JSON.parse(localStorage.getItem('value'))
}
export default ( state = initialState, {type, payload}) => {
    switch (type) {
        case 'MAIN:SET_VALUE':
            return {
                ...state,
                value: payload
            };
        default:
            return state
    }
}