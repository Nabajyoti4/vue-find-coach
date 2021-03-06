<template>
<section>
    <base-dialog :show="!!error" title="An error occcured" @close="handleError">
        <p>{{error}}</p>
    </base-dialog>
    <section>
        <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login in as a coach</base-button>
                <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to='/register'>Register as Coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches">
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id" :firstName="coach.firstName" :lastName="coach.lastName" :rate="coach.rate" :areas="coach.areas"></coach-item>
            </ul>
            <h3 v-else>No coach Found</h3>
        </base-card>
    </section>
</section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem'
import CoachFilter from '../../components/coaches/CoachFilter'

export default {

    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                carrer: true
            }
        }
    },

    components: {
        CoachItem,
        CoachFilter
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        },

        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];

            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.carrer && coach.areas.includes('carrer')) {
                    return true;
                }
                return false;
            })
        },

        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches']
        }
    },

    created() {
        this.loadCoaches();
    },

    methods: {
        setFilter(updatedFilters) {
            this.activeFilters = updatedFilters
        },
        async loadCoaches(refresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', {
                    forceRefresh: refresh
                });
            } catch (error) {
                this.error = error.message || 'Something went wrong';
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
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>
