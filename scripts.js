/* jshint ignore:start */
/**
 * @jsx React.DOM
 */
// This file cannot be minified by CodeKit (yet)

/**
 * Setup the plugin
 */
var initId = "skills-safari";
var dataInit = document.getElementById(initId);
var dataUrl = dataInit.getAttribute('data-source');
var dataPollInterval = 1000;

var classPrefix = "saf";
var classAreas = classPrefix+"-areas";
var classAreasItemDefault = classAreas+"-item";
var classSkills = classPrefix+"-skills";
var classSkillsWrapper = classSkills+"-wrapper";
var classSkillsItemDefault = classSkills+"-item";
var classSkillsItemMore = classSkillsItemDefault+"-more";
var classSkillsItemOpen = classSkillsItemDefault+'-open';
var classSkillsClose = classPrefix+"-close";
var classPopup = 'popup';
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
				currentArea: null,
				currentSkill: null,
			};
		},

		updateDataAreaActive: function(id) {
			// this.setState({currentSkill:null});
			this.setSkill(null);
			this.setState({currentArea:id});
		},

		setSkill: function(skill) {
			// If the same skill is selected again, set skill to null to close the popup
			if ( skill === this.state.currentSkill ) {
				skill = null;
			}

		    this.setState({
		        currentSkill: skill
		    });
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
			setInterval(this.loadData, this.props.pollInterval);	// Use this to automatically reload data from dataURL
		},

		render: function() {
			return (
				<div className={initId}>
					<Heading />
					<Areas data={this.state.data} onClick={this.updateDataAreaActive} currentArea={this.state.currentArea} />
					<Skills
						data={this.state.data}
						currentArea={this.state.currentArea}
						currentSkill={this.state.currentSkill}
						setSkill={this.setSkill}
						/>
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
	var buildClassName = function( that, data, classNameDefault, customAppend ) {
		var cN = classNameDefault;
		var defaultArea = that.props.data[0].defaults[0]["area"];
		var currentArea = that.props.currentArea;

		if ( 
				( currentArea === null && data.area === defaultArea)  ||
				( currentArea === data.area )
			) {
			cN += ' '+classActive;
		}
		if ( data.more !== "" && data.more !== undefined ) {
			cN += ' '+classMore;
		}
		if ( customAppend !== "" && customAppend !== undefined ) {
			cN += ' '+customAppend;
		}

		return cN;
	};

	/**
	 * Test if element hasClass.
	 */
	var hasClass = function(ele,cls) {
	    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	};
	/**
	 * Remove/add class.
	 */
	var addClass = function(ele,cls) {
	    if (!hasClass(ele,cls)) ele.className += " "+cls;
	};
	var removeClass = function(ele,cls) {
	    if (hasClass(ele,cls)) {
	        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	        ele.className = ele.className.replace(reg,' ');
	    }
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
						var cN = buildClassName(that, data, classAreasItemDefault);

						return (
							<li key={i} 
							className={cN} 
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
							<Skill 
							key={i} 
							cN={cN}
							currentSkill={that.props.currentSkill}
							setSkill={that.props.setSkill}
							group={classPrefix+"-"+data.area}
							data={data} />
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

	var Skill = React.createClass({
		getInitialState: function() {
			return {
				clicked: false,
			};
		},

		_handleClick: function() {
			// Only proceed when element is active (cN must contain classActive)
			if (this.props.cN.indexOf(classActive) < 0) return;
				this.setState({clicked: true});
			
			// Only proceed when element has classMore
			if (this.props.cN.indexOf(classMore) < 0) return;

			// Select current skill
			this.props.setSkill(this);
		},

		filterClassName: function( cN ) {
			if (
				// Only add classNoMore when element was clicked
				this.state.clicked &&
				// AND className contains classMore 
				(cN.indexOf(classMore) > -1)
				) {
					cN += ' '+classNoMore;
			}
			return cN;
		},

		render: function() {
			var that = this;

			var cN = this.filterClassName(this.props.cN);
			var cNPop = cN+' '+classPopup;
			if ( this.props.currentSkill === this ) {
				cNPop += ' '+classSkillsItemOpen;
			}

			return (
				<span className={classSkillsWrapper} data-group={this.props.group}>
					<li className={cN} key={this.props.key} onClick={this._handleClick}>{this.props.data.text}</li>
					<SkillPop
						key={this.props.key+'_pop'}
						cN={cNPop}
						setSkill={that.props.setSkill}
						data={this.props.data}
						/>
				</span>
			);
		}
	});

	var SkillPop = React.createClass({
		componentDidUpdate: function(prevProps, prevState) {
			this._showPopup();
		},

		_handleClickClose: function(e) {
			e.preventDefault();
			this.props.setSkill(null);
		},

		_showPopup: function() {
			var that = this;

			var dom = this.getDOMNode();
			var $dom = $( dom );

			if ( hasClass(dom, classSkillsItemOpen) ) {
				$dom.animate({
					opacity: 1,
				}, 0);
			} else {
				dom.style.opacity = 0;
			}
		},

		render: function() {
			return (
				<li key={this.props.key} className={this.props.cN} data-group={this.props.group}>
					<a className={classSkillsClose} href="" title="Hide popup" onClick={this._handleClickClose}>✖</a>
					{this.props.data.text}
					<div dangerouslySetInnerHTML={{__html: this.props.data.more}} className={classSkillsItemMore} />
				</li>
			);
		}
	});

	/**
	 * Initial rendering
	 */
	React.render(
		<Builder url={dataUrl} pollInterval={dataPollInterval} />,
		dataInit
	);

}( window.saf = window.saf || {}, jQuery ));
/* jshint ignore:end */