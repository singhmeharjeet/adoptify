import "./CardList.css";
import Users from "../../data.json";

// const Users = fetch("https://localhost:5000/users/data")

export default function CardList() {
	return (
		<>
			<div className="card-list-all">
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "0.5em",
					}}
				>
					<hr
						style={{
							width: "95%",
							height: "80%",
							opacity: "0",
						}}
					/>
				</div>
				<div className="display-bar">
					<div className="display-bar-btn">All</div>
					<div className="display-bar-btn">Dogs</div>
					<div className="display-bar-btn">Cats</div>
					<div className="display-bar-btn">Others</div>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "0.5em",
					}}
				>
					<hr
						style={{
							width: "90%",
							height: "80%",
							color: "#bbb",
						}}
					/>
				</div>
				<div className="card-list-container">
					<div className="-fx-image-gal">
						<div className="-fx-gal-item">
							<div className="-fx-gal-image-thumb" tabIndex="1">
								<img alt="" src={Users[0].posts[0].images[0]} />
							</div>
							<div className="-fx-gal-image-text">
								<h1>{Users[0].posts[0].title}</h1>
								<div>
									<hr />
								</div>
								<p className="-fx-gal-image-text-description">
									{Users[0].posts[0].description}
								</p>
								<ul>
									<li>{Users[0].phone}</li>
									<li>{Users[0].email}</li>
									<li>{Users[0].address}</li>
								</ul>
							</div>
						</div>
						{/* <!-- /-fx-gal-item --> */}
						<div className="-fx-gal-item">
							<div className="-fx-gal-image-thumb" tabIndex="1">
								<img alt="" src={Users[0].posts[0].images[1]} />
							</div>
							<div className="-fx-gal-image-text">
								<h1>{Users[1].posts[1].title}</h1>
								<p className="-fx-gal-image-text-description">
									{Users[1].posts[1].description}
								</p>
								<ul>
									<li>{Users[1].phone}</li>
									<li>{Users[1].email}</li>
									<li>{Users[1].address}</li>
								</ul>
							</div>
						</div>
						{/* <!-- /-fx-gal-item --> */}
					</div>
					{/* <!-- /gallery --> */}
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "0.5em",
					}}
				>
					<hr
						style={{
							width: "90%",
							height: "80%",
							color: "transparent",
						}}
					/>
				</div>
			</div>
		</>
	);
}
