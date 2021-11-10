type Entry = {
	Category: string;
	Cmdlet: string;
	Param?: string;
	Module?: string;
	Event: string;
	Timestamp: Date;
};

type HomeData = {
	data: Entry[];
};

export async function getStaticProps() {
	const res = await fetch(
		`https://robdy.github.io/whats-new-m365/changelog.json`,
	);
	const arr: Entry[] = await res.json();
	const data = arr.filter(Boolean); // falsy bouncer;
	return {
		props: { data },
	};
}

export default function Home({ data }: HomeData) {
	const filteredData = data.filter((entry: Entry) => {
		if (
			[
				`Update-TeamsAppInstallation`,
				`Get-CsTeamsShiftsConnectionConnector`,
				`Get-CsTeamsShiftsConnectionInstance`,
				`Get-CsTeamsShiftsConnectionSyncResult`,
				`Get-CsTeamsShiftsConnectionTeamMap`,
				`Get-CsTeamsShiftsConnectionUser`,
				`Get-CsTeamsShiftsConnectionWfmTeam`,
				`New-CsTeamsShiftsConnectionInstance`,
				`New-CsTeamsShiftsConnectionTeamMap`,
				`Remove-CsTeamsShiftsConnectionInstance`,
				`Remove-CsTeamsShiftsConnectionTeamMap`,
				`Set-CsTeamsShiftsConnectionInstance`,
				`Test-CsTeamsShiftsConnectionValidate`,
				`Add-TeamChannelUser`,
				`Add-TeamsAppInstallation`,
				`Get-LicenseReportForChangeNotificationSubscription`,
				`Get-TeamChannelUser`,
				`Get-TeamsAppInstallation`,
				`Get-TeamTargetingHierarchyStatus`,
				`Remove-TeamChannelUser`,
				`Remove-TeamsAppInstallation`,
				`Remove-TeamTargetingHierarchy`,
				`Set-TeamTargetingHierarchy`,
				`Update-TeamsAppInstallation`,
			].includes(entry.Cmdlet) &&
			entry.Category === `Cmdlet`
		)
			return false;
		if (
			entry.Category === `Param` &&
			entry.Param &&
			[
				`Tenant`,
				`DomainController`,
				`AsJob`,
				`Credential`,
				`RunspaceId`,
				`PSComputerName`,
				`PSShowComputerName`,
			].includes(entry.Param)
		)
			return false;
		if (
			entry.Category === `Policy` &&
			entry.Param &&
			[
				`Tenant`,
				`DomainController`,
				`AsJob`,
				`Credential`,
				`RunspaceId`,
				`PSComputerName`,
				`PSShowComputerName`,
			].includes(entry.Param)
		)
			return false;
		return true;
	});

	const tab = filteredData.map((entry: Entry) => (
		<div
			key={`box-${entry.Cmdlet}-${entry.Category}-${entry.Event}-${
				entry.Param && <p>{entry.Param}</p>
			}`}
			className={`p-4 ${entry.Event === `Add` ? `bg-green-100` : `bg-red-100`}`}
		>
			<div
				key={`${entry.Cmdlet}-${entry.Category}-${entry.Event}-${
					entry.Param && <p>{entry.Param}</p>
				}`}
				className=""
			>
				<h2 className="">{entry.Cmdlet}</h2>
				<p>{entry.Category}</p>
				<p>{entry.Event}</p>
				{entry.Param && <p>{entry.Param}</p>}
				<p>{entry.Timestamp}</p>
			</div>
		</div>
	));
	return (
		<div className="grid grid-cols-1 p-8 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{tab}
		</div>
	);
}
