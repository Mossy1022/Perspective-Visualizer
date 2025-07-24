/**
 * @file route_abuse_report.mjs
 * @description CLI used by the GitHub Action to
 *              1. validate /governance/abuse_report.yaml
 *              2. post the report to #moderator‑queue on Slack
 *              Usage:
 *                node route_abuse_report.mjs validate
 *                node route_abuse_report.mjs send
 * @author
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import Ajv from 'ajv';

/* ---------- constants ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const YAML_PATH  = path.resolve(process.cwd(), 'governance', 'abuse_report.yaml');
const SCHEMA_PATH = path.resolve(process.cwd(), 'governance', 'abuse_report.schema.json');

/* ---------- helper fns ---------- */
/**
 * Load and parse the abuse report YAML.
 * @returns {Promise<object>} parsed yaml object
 */
export async function load_abuse_report() {
  const raw_yaml = await fs.readFile(YAML_PATH, 'utf8');
  return yaml.load(raw_yaml);
}

/**
 * Validate a js object against the json schema.
 * @param {object} report
 * @returns {Promise<void>} throws on validation error
 */
export async function validate_report(report) {
  const raw_schema = await fs.readFile(SCHEMA_PATH, 'utf8');
  const schema = JSON.parse(raw_schema);
  const ajv = new Ajv({ allErrors: true, strict: true });
  const validate = ajv.compile(schema);
  const ok = validate(report);
  if (!ok) {
    console.error('❌ abuse_report.yaml failed validation:', validate.errors);
    process.exitCode = 1;
    throw new Error('abuse_report.yaml validation failed');
  }
  console.log('✅ abuse_report.yaml passes schema validation');
}

/**
 * Send the abuse report to Slack via webhook.
 * @param {object} report
 * @param {string} webhook_url
 * @returns {Promise<void>}
 */
export async function send_to_slack(report, webhook_url) {
  if (!webhook_url) {
    throw new Error('SLACK_WEBHOOK_URL secret is missing');
  }
  const payload = {
    text: `🚨 *New abuse report* ${report.report_id}\n• *Type*: ${report.violation_type}\n• *Severity*: ${report.severity}\n• *Perspective*: ${report.context.perspective_id}\n• *Reporter*: ${report.reporter.agent_id}\n<${report.evidence[0]}|Open evidence>`
  };

  const res = await fetch(webhook_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Slack API error: ${res.status} ${txt}`);
  }
  console.log('📨 abuse_report relayed to #moderator‑queue');
}

/* ---------- CLI ---------- */
(async () => {
  const [ , , cmd ] = process.argv;
  if (!cmd) {
    console.error('Usage: node route_abuse_report.mjs <validate|send>');
    process.exit(1);
  }

  const report = await load_abuse_report();

  if (cmd === 'validate') {
    await validate_report(report);
    return;
  }

  if (cmd === 'send') {
    const webhook_url = process.env.SLACK_WEBHOOK_URL;
    await validate_report(report);           // double‑check
    await send_to_slack(report, webhook_url);
    return;
  }

  console.error(`Unknown command: ${cmd}`);
  process.exit(1);
})();
