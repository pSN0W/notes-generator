// A class to keep the info in form of title and detail
// everything on the line after '>' is title
// from the next line till the next '>' everything is detail
class TitleDetailPair {
	constructor(title, details) {
		this.title = title;
		this.details = details;
	}
	getTitle() {
		return this.title;
	}
	getDetails() {
		return this.details;
	}
}

export const convertToListOfInfo = function (nodeDetails) {
	const modifiedDetails = nodeDetails.trim();
	const ans = [];

	// If user just left an empty line return empty array
	if (modifiedDetails === '') {
		return ans;
	}

	// split the modified data from '>' and loop over it
	const temp = modifiedDetails.split('>');
	for (let i = 0; i < temp.length; i++) {
		// if there is no '>' for the first sentance then give it title description and
		// everything else goes in detail
		if (i === 0 && modifiedDetails[0] !== '>') {
			const titleDetailPair = new TitleDetailPair('Description', temp[0]);
			ans.push(titleDetailPair);
		} else {
			const element = temp[i];
			if (element) {
				// get the first '\n' character
				// everything before is title
				// everything after is description
				const i = element.indexOf('\n');
				const title = element.substring(0, i);
				const desc = element.substring(i + 1);
				const titleDetailPair = new TitleDetailPair(title, desc);
				ans.push(titleDetailPair);
			}
		}
	}
	return ans;
};
