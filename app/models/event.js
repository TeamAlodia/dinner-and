import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  maxParticipants: DS.attr(),
  zip: DS.attr(),
  description: DS.attr(),
  rating: DS.attr(),
  // interests: DS.hasMany('interest', { async: true })
  //hasmany photos
  //user belongsto
  //hasmany invited
  //hasmany attended
  //hasmany interests
});