import React from 'react';
import YTSearch from 'youtube-api-search';
import VideoDetail from './video_details';

const YOUTUBE_API = 'AIzaSyDrVE3_n4tk6oguVwRxeDuGkfM_csol7ys';

export class Trailer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [], 
			selectedVideos: null
		};
	}	
	
	getTrailer(term) {
		// The arrow is a function call with data as a param
		YTSearch({key: YOUTUBE_API, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			}); 
		});
	}

	render() {
		this.getTrailer(this.props.trailer + ' Trailer');
		console.log(this.props.trailer);
		return (
			<div>
				<VideoDetail video={this.state.selectedVideo}/>
			</div>
		);
	}
}
