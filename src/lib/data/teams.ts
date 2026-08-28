import type { TeamData } from '$lib/types';

export const team: TeamData = {
	name: 'Bot Not Found',
	number: '23404',
	eyebrow: 'Founded 2023 · FIRST Tech Challenge',
	heroLine: "Redmond High's first",
	heroEm: 'robotics team.',
	intro:
		'Redmond High had no robotics club before 2023. Students had tried to start one around 25 times in the previous decade. The school has no shop and no STEM teacher free to advise a team, so we asked an English teacher and met off campus. Nine of us started it. Nine of us still run it, with a second team next to us now.',
	specs: [
		{ k: 'Season', v: '2025–26 · DECODE' },
		{ k: 'Robot', v: 'Redshift, second revision' },
		{ k: 'Roster', v: '9 · build, CAD, software, PR' },
		{ k: 'Sister team', v: 'Bot Got Found 32954, 4 students' },
		{ k: 'Drive practice', v: '20–25 hours this season' }
	],
	photoSlot: 'team photo, full roster',
	photoCaption: 'The team, 2025–26',
	missionBig:
		'Our mission is to foster inclusivity, welcoming individuals of all skill levels. With no entry requirements and robust training, we create an open environment for anyone curious about robotics, no matter their starting point.',
	missionAttr: 'DECODE portfolio, 2026',
	missionTail:
		'Over half our recruits have never built a robot. We filmed our own CAD and programming training and put it online for other teams.',
	pillars: [
		{
			n: '01',
			title: 'Objective-oriented analysis',
			body: 'Scoring objectives and rules first, ranked in a weighted objectives table. The team votes. We redo it after every competition.'
		},
		{
			n: '02',
			title: 'The build loop',
			body: 'Research, whiteboard, simulate, assemble, test, integrate. We budget torque before we cut: the 2024–25 arm carried 67 N·m against a 20 N·m load.'
		},
		{
			n: '03',
			title: 'Built to be revised',
			body: 'Master sketches drive every custom part. Complex parts are 3D printed, plates laser cut, the turret modular. A change is cheap.'
		}
	],
	historyTitle: 'Three seasons, logged',
	historyIntro: 'From our engineering portfolios. Dates are league meets. Results are what the event recorded.',
	seasons: [
		{
			id: 'season-2025-26',
			years: '2025–26',
			tag: 'Current',
			game: 'DECODE',
			body: 'We call the robot Redshift. Halfway through the season we scrapped it and started over. V1 had an intake too small and a transfer too slow, and four rounds of funnel geometry fixed neither. V2 runs a turret and a spindexer.',
			log: [
				{
					k: 'Rookie Rumble',
					v: 'Single linear transfer, non-adjustable hooded shooter, working auto-aim, no autonomous. The intake was too small and the transfer had dead zones.'
				},
				{
					k: 'LM1',
					v: 'Added a transfer on the other side and lengthened it to clear the dead zones. Added funnels to make up for the small intake. Autonomous ran. The robot shot twice when it should have shot once.'
				},
				{
					k: 'LM2',
					v: 'Redesigned the funnels, added wheel guards, tested convex and concave shapes. Fixed the double shooting in code and at the kicker. Autonomous reliable.'
				},
				{ k: 'Feynman Interleague', v: 'Intake still not wide enough. We decided on a full rebuild.' },
				{
					k: 'Rebuild',
					v: 'Parallel-plate drivetrain, 270-degree turret at about 120 rpm on a bearing stack, adjustable-hood shooter, spindexer transfer, Gecko wheel intake geared from 1150 to 1725 rpm.'
				},
				{
					k: 'Result',
					v: 'Shooting dropped from 3 seconds to under 1. Teleop cycles rose from 14 balls to 35. We still sort motifs by hand and we need more drive practice.'
				},
				{ k: 'Growth', v: 'Second team 32954 formed to absorb demand, with four students of its own.' }
			],
			photo: 'Redshift V2, turret and spindexer',
			fig: 'Current robot'
		},
		{
			id: 'season-2024-25',
			years: '2024–25',
			tag: 'Second season',
			game: 'INTO THE DEEP',
			body: "Megan Lewis, the school's new engineering teacher, took over as head coach. Parker Sudderth, an engineer at RTX, mentored our mechanical design. We documented the process as closely as the robot.",
			log: [
				{
					k: 'Strategy',
					v: 'High basket over chamber, L2 ascent over L3, fewest points of failure. Ranked in a weighted objectives table.'
				},
				{ k: 'Drivetrain', v: 'Two complete CAD revisions in Onshape before assembly.' },
				{
					k: 'Extension',
					v: 'Two opposed three-stage Misumi slides; 5:1 bevel-geared pivot with integrated hooks.'
				},
				{
					k: 'Autonomous',
					v: 'SparkFun OTOS optical odometry with PID-to-Pose, replacing Road Runner. Faster to tune and no encoder drift.'
				},
				{
					k: 'Field fix',
					v: 'The robot kept disconnecting at LM0. We traced it to static in the wiring and fixed it in the pit with anti-static dryer sheets.'
				}
			],
			photo: '2025 robot, basket scoring',
			fig: 'Pivot and linear slides'
		},
		{
			id: 'season-2023-24',
			years: '2023–24',
			tag: 'Rookie season',
			game: 'CENTERSTAGE',
			body: 'We had no funds and no shop. The team split into hardware and software in the first weeks, and hardware built a drivetrain. We planned a custom claw on linear slides. We brought a push bot.',
			log: [
				{
					k: 'LM0 · Oct 6',
					v: 'Scrimmage. Push bot. We failed inspection. First competition for most of the team.'
				},
				{ k: 'LM1 · Nov 4', v: 'Briefly held 1st. Placed 6th with an OPR of 20.36.' },
				{
					k: 'LM2 · Dec 2',
					v: '10-inch arm at 254.1:1 after the 17-inch arm failed inspection. Field-centric drive did not behave.'
				},
				{
					k: 'Interleague · Jan 13',
					v: 'Working hang and drone launcher, adaptable intake. Best the robot had ever been.'
				},
				{
					k: 'Correction',
					v: 'After LM2 we wrote build laws: 7 motors or fewer, 4 servos or fewer, a pushbot failsafe, and the scoring mechanism done three weeks early.'
				}
			],
			photo: '2024 robot, interleague',
			fig: 'Hang + drone launcher'
		}
	],
	sponsorTitle: 'Somebody paid for every part on this robot',
	sponsorIntro:
		'Grants, corporate sponsorship, and employee benefit matching pay for this team. Your name rides on the robot to every event, and goes on the pit banner, the jerseys, and this page.',
	sponsors: [
		{
			tier: 'gold',
			name: 'Gene Haas Foundation',
			note: 'Grant funding for manufacturing education.',
			url: 'https://www.ghaasfoundation.org'
		},
		{
			tier: 'silver',
			logo: '/sponsors/microsoft.png',
			name: 'Microsoft',
			note: 'Employee benefit matching.',
			url: 'https://www.microsoft.com'
		},
		{
			tier: 'bronze',
			logo: '/sponsors/first-washington.png',
			name: 'FIRST Washington',
			note: 'Grant support since our rookie season.',
			url: 'https://firstwa.org'
		},
		{
			tier: 'bronze',
			logo: '/sponsors/polymaker.png',
			name: 'Polymaker',
			note: 'Filament for every 3D printed part on the robot.',
			url: 'https://polymaker.com'
		},
		{
			tier: 'bronze',
			name: 'Fabworks',
			note: 'Online sheet metal laser cutting and bending.',
			url: 'https://www.fabworks.com'
		},
		{ tier: 'bronze', name: 'SendCutSend', note: 'Laser cut and CNC parts.', url: 'https://sendcutsend.com' }
	],
	partners: [
		{ name: 'RTX', note: 'Mechanical design mentorship' },
		{ name: 'Carbon Robotics', note: 'Computer vision' },
		{ name: 'Meta Reality Labs', note: 'Design process' },
		{ name: 'Crash Out 23405', note: 'Scrimmages and shared parts' },
		{ name: 'FTC 19500 Robeartics', note: 'Worldwide Connection Project' },
		{ name: 'Bot Got Found 32954', note: 'Sister team, shared shop' }
	],
	sponsorPitch: 'The same money buys more than a robot.',
	sponsorPitchTail:
		'It paid for the CAD and programming training we publish for other teams, the Halloween robotics game we run for elementary schoolers at Harvest Fest, and the robotics classes we taught to 100 students at two schools in Hyderabad.'
};
