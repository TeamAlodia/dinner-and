import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),
  actions:{
    snuffleLogin() {
      var currentThis = this;

      this.get('session').open('firebase', {
        provider: 'password',
        email: 'snuffle@email.com',
        password: 'snuffle'
      }).then(function() {
        currentThis.transitionTo('user', currentThis.get('session.uid'));
      });
      $('#modal_sign_in').modal('hide');
    },

    toggleSidebar(){
      $("#sub-sidebar").sidebar('toggle');
    },

    createUser(params, email, password) {
      if (this.get('session.isAuthenticated')) {
        this.get('session').close();
      }
      var newUser = this.store.createRecord('user', params);
      var currentThis = this;
      const auth = this.get('firebaseApp').auth();
      var storage = this.store;

      auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.message);
      }).then(function(user) {
        newUser.set('id', user.uid);
        newUser.save().then(function() {
          currentThis.get('session').open('firebase', {
            provider: 'password',
            email: email,
            password: password
          }).then(function() {
            console.log(user.uid);
            currentThis.store.unloadAll();
            currentThis.transitionTo('user', user.uid);
          });
        });
      });
      $('#modal_sign_up').modal('hide');
    },

    loginUser(params) {
      var currentThis = this;
      this.get('session').open('firebase', {
        provider: 'password',
        email: params.email,
        password: params.password
      }).then(function() {
        currentThis.transitionTo('user', currentThis.get('session.uid'));
      });
      $('#modal_sign_in').modal('hide');
    },

    logout() {
      var currentThis = this;
      this.get('session').close().then(function() {
        currentThis.transitionTo('index');
      });
    },

    //pops up modal
    openSignIn() {
        $('#modal_sign_in').modal('show');
    },
    //pops up modal
    openSignUp() {
        $('#modal_sign_up').modal('show');
    }

  }
});
