<template>
<div>
    <base-dialog :show="!!error" titile="An error occured" @close="handleError">
        {{error}}
    </base-dialog>
    <base-dialog :show="isLoading" title="Authentication.." fixed>
        <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="email">E-mail</label>
                <input type="email" id="email" v-model.trim="email">
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password">
            </div>
            <p v-if="!formIsValid">Please enter a valid email and password of at least 6 character </p>
            <base-button>{{ submitButtonCaption }}</base-button>
            <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
        </form>
    </base-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            formIsValid: true,
            mode: "Login",
            isLoading: false,
            error: null
        }
    },

    computed: {
        submitButtonCaption() {
            if (this.mode === "Login") {
                return "Login";
            } else {
                return "Signup";
            }
        },

        switchModeButtonCaption() {
            if (this.mode === "Login") {
                return "Signup instead";
            } else {
                return "Login instead";
            }
        }
    },

    methods: {
        async submitForm() {
            if (this.email === "" && this.password.length < 6) {
                this.formIsValid = false;
                return;
            }

            this.isLoading = true;

            const actionPayload = {
                email: this.email,
                password: this.password
            }

            try {

                if (this.mode === 'Login') {
                    await this.$store.dispatch('login', actionPayload);
                } else {
                    await this.$store.dispatch('signup', actionPayload);
                }

                const redirectUrl = '/' + (this.$router.query.redirect || 'coaches');
                this.$router.replace(redirectUrl);
            } catch (error) {
                this.error = error.message || "failed to authenticate, try later"
            }

            this.isLoading = false;

            // send http request
        },
        switchAuthMode() {
            if (this.mode == "Login") {
                this.mode = "Signup"
            } else {
                this.mode = "Login"
            }
        },

        handleError() {
            this.error = null
        }
    },
}
</script>

<style scoped>
form {
    margin: 1rem;
    border-radius: 12px;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}
</style>
