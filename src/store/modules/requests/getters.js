export default {
    showRequest(state, rootGetters){
        const coachId  = rootGetters.userId;
        return state.requests.filter(req => req.coachId === coachId);
    },

    hasRequest(getters){
        return getters.requests && getters.requests.length > 0;
    }
}