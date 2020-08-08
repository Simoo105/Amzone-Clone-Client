<template>
    <main>
        <div class= "container- fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Profile Page</h2>
                        <a href="#" @click="onLogout">Logout</a>
                        <form  enctype="multipart/form-data">
                            <!-- Name -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;" >Name</label>
                                <input type="text" class="a-input-text" style ="width: 100%" v-model="name">
                            </div>
                            <!-- email -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;" >Email</label>
                                <input type="text" class="a-input-text" style ="width: 100%" v-model="email">
                            </div>
                            <!-- password -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px;" >Password</label>
                                <input type="text" class="a-input-text" style ="width: 100%" v-model="password">
                            </div>
                            <!-- Button -->
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onUpdateProfile">Update Profile</span>
                                    </span>
                                </span>
                            </div>
                        </form>
                        <div class="a-spacing-top-medium"></div>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                name: this.$store.getters.loggedInUser.name,
                email: this.$store.getters.loggedInUser.email,
                password: ''
            }
        },
        methods: {
            async onUpdateProfile() {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                try {
                    let response = await this.$axios.$put('/api/auth/user', data)

                    if(response.success) {
                        await this.$auth.fetchUser();
                    }
                } 
                catch (error) {
                    console.log(error)
                }
            },
            async onLogout() {
                await this.$auth.logout();
            }
        }
    }
</script>