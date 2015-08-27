/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	showHomePage: function (req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('homepage');
    }


    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('user does not exists');
        return res.view('homepage');
      }

      return res.view('dashboard', {
        me: {
          id: user.id,
          name: user.name,
          email: user.email,
          title: user.title,
          isAdmin: !!user.admin,
          gravatarUrl: user.gravatarUrl
        }
      });

    });
  },

};
