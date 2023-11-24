export default class PostDetailsResponse {
	private id: any;
	private postTitle: any;
	private postDescription: any;
	private postCarMake: any;
	private postCarYear: any;
	private postImageUrl: any;
	private postCarType: any;
	private postCarFuelType: any;

	constructor(
		id: any,
		postTitle: any,
		postDescription: any,
		postCarMake: any,
		postCarYear: any,
		postImageUrl: any,
		postCarType: any,
		postCarFuelType: any
	) {
		this.id = id;
		this.postTitle = postTitle;
		this.postDescription = postDescription;
		this.postCarMake = postCarMake;
		this.postCarYear = postCarYear;
		this.postImageUrl = postImageUrl;
		this.postCarType = postCarType;
		this.postCarFuelType = postCarFuelType;
	}
}
