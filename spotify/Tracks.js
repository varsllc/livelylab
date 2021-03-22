import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Tracks = () => {

	// Set up states for retrieving access token and top tracks
	const [token, setToken] = useState('');
	const [tracks, setTracks] = useState([]);

	// Artist ID from Spotify
	const id = '06HL4z0CvFAxyc27GXpf02';
	const market = 'US';

	useEffect(()=>{

		// Api call for retrieving token
		axios('https://accounts.spotify.com/api/token', {
			'method': 'POST',
			'headers': {
				 'Content-Type':'application/x-www-form-urlencoded',
				 'Authorization': 'Basic ' + (new Buffer('Your Client ID' + ':' + 'Your Client Secret').toString('base64')),
			},
			data: 'grant_type=client_credentials'
		}).then(tokenresponse => {
			console.log(tokenresponse.data.access_token);
			setToken(tokenresponse.data.access_token);

			// Api call for retrieving tracks data
			axios(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=${market}`,{
				'method': 'GET',
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + tokenresponse.data.access_token
				}
			}).then(trackresponse=> {
				console.log(trackresponse.data.tracks);
				setTracks(trackresponse.data.tracks);
			}).catch(error=> console.log(error))
		}).catch(error => console.log(error));
	},[])

	// Transform track data 
	function PopularityByTrack(data){

		let plotData = [];

		let names = [];
		let popularity = [];

		data.map(each => {
			names.push(each.name);
			popularity.push(each.popularity);
		})

		plotData['names'] = names;
		plotData['popularity'] = popularity;

		return plotData;
	}

	return(
		<div>
			<Plot 
				data={[
					{
						type: 'bar',
						x: PopularityByTrack(tracks)['names'],
						y: PopularityByTrack(tracks)['popularity'],
						marker: {color:'#03fc6b'}
					}
				]}
				layout={{
					width: 1000, 
					height: 600, 
					// title: 'Taylor Swfit Top Tracks'
					title: '<b>Taylor Swift Top Tracks</b> <br> <sub>US Market</sub>',
					margin:{
						l: 100,
						r: 100,
						b: 150,
						t: 150,
						pad: 4
					},
					paper_bgcolor: '#919191',
					plot_bgcolor: '#919191',
					font: {
						family: 'Newsreader, serif',
						size: 20,
						color: 'white'
					},
					xaxis: {
						title: 'Name',
						titlefont: {
							family: 'Arial, sans-serif',
							size: 12,
							color: 'white'
						},
						showticklabels: false,
						tickfont:{
							family: 'Arial, sans-serif',
							size: 12,
							color: 'white'
						}
					},
					yaxis: {
						title: 'Popularity',
						titlefont: {
							family: 'Arial, sans-serif',
							size: 12,
							color: 'white'
						},
						showticklabels: true,
						tickfont: {
							family: 'Arial, sans-serif',
							size: 12,
							color: 'white'
						}
					},
					hovermode: 'closest'
				}}
			/>
		</div>
	)
}


export default Tracks;