/**
 * @file abuse_report.test.mjs
 * @description Integration test: ensure sample abuse_report.yaml
 *              validates against the schema.
 */
import { load_abuse_report, validate_report } from '../scripts/route_abuse_report.mjs';

try {
  const report = await load_abuse_report();
  await validate_report(report);
  console.log('✓ abuse_report.yaml → schema ✅');
} catch (err) {
  console.error(err);
  process.exit(1);
}


/**
 * Developer notes
Secrets – add SLACK_WEBHOOK_URL to repo or org secrets pointing to https://hooks.slack.com/services/… for #moderator‑queue.

Rate‑limits – each new abuse report increments rate_limit_violation_total once routed; hook monitoring already exists in Observability and Dev Ops.md.

Path‑guard – any PR that alters governance/abuse_report.yaml automatically triggers this workflow, blocking merge on schema failure and alerting moderators on success.
 */