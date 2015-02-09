/* jshint ignore:start */
/**
 * @jsx React.DOM
 */
// This file cannot be minified by CodeKit (yet)

/**
 * Setup the plugin
 */
var initId = "skills-safari";
var dataUrl = "data.json";
var dataPollInterval = 1000;

var classPrefix = "saf";
var classAreas = classPrefix+"-areas";
var classAreasItemDefault = classAreas+"-item";
var classSkills = classPrefix+"-skills";
var classSkillsItemDefault = classSkills+"-item";
var classActive = classPrefix+"-active";
var classMore = classPrefix+"-more";
var classNoMore = classPrefix+"-no-more";

/**
 * Magic happens here.
 */
(function( saf, $ ) {

	var Builder = React.createClass({
		getInitialState: function() {
			return {
				data: [],
				currentArea: "",
			};
		},

		updateDataAreaActive: function( id ) {
			this.setState({currentArea:id});
		},

		loadData: function() {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				success: function(data) {
					this.setState({data: data});
				}.bind(this)
			});
		},

		componentDidMount: function() {
			this.loadData();
			// setInterval(this.loadData, this.props.pollInterval);	// Use this to automatically reload data from data.json
		},

		render: function() {
			return (
				<div className={initId}>
					<Heading />
					<Areas data={this.state.data} onClick={this.updateDataAreaActive} currentArea={this.state.currentArea} />
					<Skills data={this.state.data} currentArea={this.state.currentArea} />
				</div>
			);
		}
	});

	var Heading = React.createClass({
		render: function() {
			return (
				<h1>Skills Safari (React)</h1>
			);
		}
	});

	/**
	 * Build class names for Areas and Skills, based on default area data.json)
	 */
	var buildClassName = function( that, data, classNameDefault ) {
		var cN = classNameDefault;
		var defaultArea = that.props.data[0].defaults[0]["area"];
		var currentArea = that.props.currentArea;

		if ( currentArea === "" && data.area === defaultArea ) {
			cN += ' '+classActive;
		} else if ( currentArea === data.area ) {
			cN += ' '+classActive;
		}

		return cN;
	};

	/**
	 * Areas
	 */
	var Areas = React.createClass({
		render: function() {
			var that = this; 

			var AreaList = this.props.data.map( function( data, i ) {
				return (
					data.areas.map( function( data, i ) {
						var cn = buildClassName(that, data, classAreasItemDefault);

						return (
							<li key={i} 
							className={cn} 
							data-group={classPrefix+"-"+data.area} 
							onClick={function(){that.props.onClick(data.area)}}>
							{data.text}
							</li>
						);
					})
				);
			});

			return (
				<ul className={classAreas}>
					{AreaList}
				</ul>
			);
		}
	});

	/**
	 * Skills
	 */
	var Skills = React.createClass({
		render: function() {
			var that = this;

			var SkillList = this.props.data.map( function( data, i ) {
				return (
					data.skills.map( function( data, i ) {
						var cN = buildClassName(that, data, classSkillsItemDefault);

						return (
							<li key={i} className={cN} data-group={classPrefix+"-"+data.area}>{data.text}</li>
						);
					})
				);
			});

			return (
				<ul className={classSkills}>
					{SkillList}
				</ul>
			);
		}
	});

	/**
	 * Initial rendering
	 */
	React.render(
		<Builder url={dataUrl} pollInterval={dataPollInterval} />,
		document.getElementById(initId)
	);

}( window.saf = window.saf || {}, jQuery ));
/* jshint ignore:end */