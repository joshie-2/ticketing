import axios from 'axios';

const Home = ({ currentUser }) => {
	console.log(currentUser);
	return <h1> Landing Pages </h1>;
};

Home.getInitialProps = async ({ req }) => {
	console.log(req);
	// defines if being called on the server or within the client.
	if (typeof window === 'undefined') {
		// server
		const { data } = await axios.get(
			// SERVICE-NAME.NAMESPACE.svc.cluster.local/PATH
			'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
			{
				headers: req.headers,
			},
		);
		return data;
	} else {
		// browser
		try {
			const { data } = await axios.get('/api/users/currentuser');
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
};

export default Home;
