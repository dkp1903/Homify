import React from "react";

const Review = ({
	author,
	date,
	text,
    options,
    renderOptions
}) => {
	return (
		<article class="media">
			<div class="content">
				<p>
					<div class="level" style={{marginBottom:'5px'}}>
						<div class="level-left">
							<div class="level-item">
								<strong style={{ fontSize:"20px" }}>{author}</strong>
							</div>
							<div class="level-item">
								<small style={{ fontSize:"13px" }}>{date}</small>
							</div>
                            {renderOptions && options}
						</div>
					</div>
					<p style={{ fontSize:"18px" }}>{text}</p>
				</p>
			</div>
		</article>
	);
}

export default Review;