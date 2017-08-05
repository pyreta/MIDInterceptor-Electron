const lightShadow = ctx => {
  ctx.shadowColor= 'rgba(0,0,0,1)';
  ctx.shadowOffsetX= 2;
  ctx.shadowOffsetY= 2;
  ctx.shadowBlur = 6;
}

export const rect = (ctx, {
  x,
  y,
  width,
  height,
  borderRadius = 0,
  fill,
  borderColor = 'black',
  borderWidth = 1,
  shadow
}) => {
  ctx.beginPath();
  ctx.moveTo(x, y + borderRadius);
  ctx.lineTo(x, y + height - borderRadius);
  borderRadius && ctx.arcTo(x, y + height, x + borderRadius, y + height, borderRadius);
  ctx.lineTo(x + width - borderRadius, y + height);
  borderRadius && ctx.arcTo(x + width, y + height, x + width, y + height-borderRadius, borderRadius);
  ctx.lineTo(x + width, y + borderRadius);
  borderRadius && ctx.arcTo(x + width, y, x + width - borderRadius, y, borderRadius);
  ctx.lineTo(x + borderRadius, y);
  borderRadius && ctx.arcTo(x, y, x, y + borderRadius, borderRadius);
  ctx.fillStyle = fill;
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = borderColor;
  shadow && lightShadow(ctx);
  fill && ctx.fill();
  ctx.shadowColor= 'rgba(0,0,0,0)';
  borderWidth && ctx.stroke();
};
