const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('user')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user)
	})
})

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleSecretKey,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			const exisitingUser = await User.findOne({ googleId: profile.id })

			if (exisitingUser) {
				return done(null, exisitingUser)
			}
			const user = await new User({
				googleId: profile.id,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value,
				profileImage: profile.photos[0].value,
				verified: false
			}).save()
			done(null, user)
		}
	)
)
