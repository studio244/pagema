import { describe, expect, test } from 'bun:test';
import { compatibleAgencies, validateRecipientSelection } from './agency-matching';
const metassur = { slug: 'meta-assurances-et-conseils', published: true, coverage_cities: ['Marrakech'], offering_slugs: ['assurance-automobile','assurance-habitation','assurance-multirisque-professionnelle','assurance-accidents-du-travail'] };
describe('Metassur eligibility', () => {
  for (const offering of metassur.offering_slugs) test(`${offering} at Marrakech`, () => expect(compatibleAgencies([metassur],offering,'Marrakech')).toEqual([metassur]));
  test('No other city without configuration', () => expect(compatibleAgencies([metassur],'assurance-automobile','Casablanca')).toEqual([]));
  test('No incompatible prestation', () => expect(compatibleAgencies([metassur],'nettoyage','Marrakech')).toEqual([]));
  test('No unpublished agency', () => expect(compatibleAgencies([{...metassur,published:false}],'assurance-automobile','Marrakech')).toEqual([]));
  test('At most three recipients', () => {
    const agencies = [metassur,...['b','c','d'].map(slug=>({...metassur,slug}))];
    expect(validateRecipientSelection(agencies,'assurance-automobile','Marrakech',[metassur.slug,'b','c'])).toBe(true);
    expect(validateRecipientSelection(agencies,'assurance-automobile','Marrakech',[metassur.slug,'b','c','d'])).toBe(false);
  });
  test('No exclusive attribution', () => expect(validateRecipientSelection([metassur,{...metassur,slug:'other'}],'assurance-automobile','Marrakech',['other'])).toBe(true));
});