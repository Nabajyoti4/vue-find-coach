<template>
<section>
    <base-dialog :show="!!error" title="An error occcured" @close="handleError">
        <p>{{error}}</p>
    </base-dialog>
    <base-card>
        <header>
            <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequest && !isLoading">
            <request-item v-for="request in recievedRequest" :key="request.id" :email="request.userEmail" :message="request.message">
            </request-item>
        </ul>
        <h3 v-else>You havent recevied any requests yet!</h3>
    </base-card>
</section>
</template>

<script>
import RequestItem from '../../components/requests/ReuqestItem';
export default {
    data() {
        return {
            isLoading: false,
            error: null
        }
    },

    components: {
        RequestItem
    },
    computed: {
        recievedRequest() {
            return this.$store.getters['requests/showRequest'];
        },

        hasRequest() {
            return this.$store.getters['requests/hasRequest'];
        }
    },

    created() {
        this.loadRequests();
    },

    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/fetchRequests');
            } catch (error) {
                this.error = error.message || 'something went wrong'
            }

            this.isLoading = false;
        },

        handleError() {
            this.error = null;
        }
    },
}
</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>
