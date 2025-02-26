# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM public.ecr.aws/docker/library/node:18.20.3-alpine as base

FROM base as deps
WORKDIR /frontend
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install

FROM base as builder
WORKDIR /frontend
COPY . .
COPY --from=deps /frontend/.yarn ./.yarn
COPY --from=deps /frontend/.pnp.cjs ./.pnp.cjs
COPY --from=deps /frontend/.pnp.loader.mjs ./.pnp.loader.mjs

RUN yarn build

FROM base as runner
WORKDIR /frontend

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /frontend/.next/standalone/ .
RUN rm -rf .yarn
COPY --from=deps --chown=nextjs:nodejs /frontend/.yarn ./.yarn
COPY --from=deps --chown=nextjs:nodejs /frontend/.pnp.cjs ./.pnp.cjs

USER nextjs
EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
CMD ["node", "-r", "./.pnp.cjs", "server.js"]
